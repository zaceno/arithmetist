import onAnimationFrame from "lib/io/on-animation-frame.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */

/**
 * @typedef State
 * @prop {number } started
 * @prop {number} now
 * @prop {number} duration
 */
/**
 * @template S
 * @typedef TimerWireProps
 * @prop {(s:S) => State} get
 * @prop {(s:S, x:State) => S} set
 * @prop {Action<S, any> | [Action<S, any>, any]} [OnStart]
 * @prop {Action<S, any> | [Action<S, any>, any]} [OnTimeout]
 */

/** @template S @param {TimerWireProps<S>} props */
export const wire = ({ get, set, OnStart, OnTimeout }) => {
  /** @type {Action<S, number>} */
  const Start = (state, duration) => {
    const time = performance.now()
    return [
      set(state, {
        now: time,
        started: time,
        duration,
      }),
      OnStart && (d => d(OnStart)),
    ]
  }

  /** @type {Action<S, number>} */
  const Update = (state, time) => {
    const timer = get(state)
    const next = { ...timer, now: time }
    if (isActive(next)) return set(state, next)
    return [
      set(state, { ...timer, now: timer.started + timer.duration }),
      OnTimeout && (d => d(OnTimeout, timer.duration)),
    ]
  }

  /** @param {S} state */
  const status = state => {
    let timer = get(state) || {}
    if (!isActive(timer)) return { duration: 0, ran: 0 }
    return { duration: timer.duration, ran: timer.now - timer.started }
  }

  /** @param {S} state */
  const subs = state => {
    let timer = get(state)
    return [isActive(timer) && onAnimationFrame(Update)]
  }

  return {
    Start,
    status,
    subs,
  }
}

/** @param {State} timer */
const isActive = timer => {
  if (!timer) return false
  let { started, now, duration } = timer
  return now - started < duration
}
