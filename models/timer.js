import onanimationframe from "../io/animation-frame.js"

/**
 * @typedef State
 * @prop {boolean} running
 * @prop {number } started
 * @prop {number} now
 * @prop {number} duration
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, number>} Reset
 * @prop {Action<S, number>} Start
 * @prop {(s:S) => {full: number, level: number}} gaugeProps
 * @prop {(s:S) => boolean} isRunning
 * @prop {(s:S) => (false | Subscription<S, any>)[]} subs
 *
 */

/**
 * @template S,X,Y
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {Action<S, any> | [Action<S, X>, X]} props.onStart
 * @param {Action<S, any>| [Action<S, Y>, Y]} props.onTimeout
 * @returns {Model<S>}
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
  const gaugeProps = state => {
    let { duration, now, started } = get(state)
    return !duration
      ? { full: 1, level: 0 }
      : {
          full: duration,
          level: now - started,
        }
  }

  /** @param {S} state */
  const isRunning = state => get(state).running

  /**
   * @param {S} state,
   */
  const subs = state => {
    let timer = get(state)
    return [
      !!timer &&
        !!timer.duration &&
        !!timer.running &&
        onanimationframe(Update),
    ]
  }

  return {
    Reset,
    Start,
    gaugeProps,
    isRunning,
    subs,
  }
}
