/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S @typedef {import('hyperapp').Dispatch<S>} Dispatch */
/** @template S,X @typedef {import('hyperapp').Subscription<S, X>} Subscription */

/**
 * @template S
 * @param {Dispatch<S>} dispatch,
 * @param {{action: Action<S, number>}} options
 */
const _onanimationframe = (dispatch, options) => {
  let running = true
  let next = () => {
    requestAnimationFrame(timestamp => {
      if (!running) return
      dispatch(options.action, timestamp)
      next()
    })
  }
  next()
  return () => {
    running = false
  }
}

/**
 * @template S
 * @param {Action<S, number>} action
 * @returns {Subscription<S, {action: Action<S, number>}>}
 */
export default action => [_onanimationframe, { action }]
