import onanimationframe from "@/lib/io/animation-frame.js"
import gauge from "@/views/gauge.js"
/**
 * @typedef State
 * @prop {boolean} running
 * @prop {number } started
 * @prop {number} now
 * @prop {number} duration
 */

/**
 * @template S,X,Y
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {Action<S, any> | [Action<S, X>, X]} props.onStart
 * @param {Action<S, any>| [Action<S, Y>, Y]} props.onTimeout
 */
export default ({ get, set, onStart, onTimeout }) => {
  /** @type {Action<S, number>} */
  const Reset = (state, duration) =>
    set(state, {
      running: false,
      started: 0,
      now: 0,
      duration,
    })

  /** @type {Action<S, number>} */
  const Start = (state, time) => {
    const timer = get(state)
    if (!timer.duration) return state
    return [
      set(state, {
        ...timer,
        now: time,
        running: true,
        started: time,
      }),
      [
        d => {
          d(onStart)
        },
        null,
      ],
    ]
  }

  /** @type {Action<S, number>} */
  const Update = (state, time) => {
    const timer = get(state)
    if (!timer.duration) return state
    if (!timer.running) return state
    else if (time - timer.started >= timer.duration) {
      return [
        set(state, {
          ...timer,
          running: false,
          now: timer.started + timer.duration,
        }),
        [
          d => {
            d(onTimeout)
          },
          null,
        ],
      ]
    } else {
      return set(state, {
        ...timer,
        now: time,
      })
    }
  }

  /** @param {S} state */
  const view = state => {
    let { duration, now, started } = get(state)
    return gauge(
      !duration
        ? { full: 1, level: 0 }
        : {
            full: duration,
            level: now - started,
          }
    )
  }

  /** @param {S} state */
  const subs = state => (get(state)?.running ? [onanimationframe(Update)] : [])

  return {
    Reset,
    Start,
    view,
    subs,
  }
}
