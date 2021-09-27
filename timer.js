/**
 * @typedef {object} TimerState
 * @prop {number} duration
 * @prop {number} start
 * @prop {number} now
 */

/**
 * @param {number} time
 * @param {number} duration
 * @returns {TimerState}
 */
export const start = (time, duration) => ({
  duration,
  start: time,
  now: time,
})

/**
 * @param {TimerState} state
 * @param {number} time
 * @returns {TimerState}
 */
export const update = (state, time) => ({
  ...state,
  now: time,
})

/**
 * @param {TimerState} state
 * @returns {boolean}
 */
export const timeUp = state => state.now - state.start > state.duration

/** @type {TimerState} */
export const initial = { duration: 0, start: 0, now: 0 }

/**
 * @param {TimerState} state
 * @returns {number}
 */
export const fraction = state =>
  state.duration === 0 ? 0 : (state.now - state.start) / state.duration
