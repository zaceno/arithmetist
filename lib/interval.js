/** @typedef {import('hyperapp').Unsubscribe} Unsubscribe */
/** @template S @typedef {import('hyperapp').Dispatch<S>} Dispatch */
/** @template S,X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S,X @typedef {import('hyperapp').Subscription<S, X>} Subscription */

/**
 * @template S
 * @typedef IntervalOptions
 * @prop {Action<S, number>} action
 * @prop {number} time
 */

/** @type {<S>(dispatch:Dispatch<S>, options:IntervalOptions<S>) => Unsubscribe} */
const interval = (dispatch, options) => {
  const i = setInterval(() => {
    dispatch(options.action, Date.now())
  }, options.time)
  return () => {
    clearInterval(i)
  }
}

/** @type {<S>(action:Action<S,number>, time: number) => Subscription<S, IntervalOptions<S>>} */
export default (action, time) => [interval, { action, time }]
