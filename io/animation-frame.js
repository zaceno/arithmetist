/**
 * @template S
 * @typedef OnAnimationFrameOptions
 * @prop {Action<S, number>} action
 */

/**
 * @template S
 * @param {Dispatch<S>} dispatch,
 * @param {OnAnimationFrameOptions<S>} options
 */
const onanimationframe = (dispatch, options) => {
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

/** @type {<S>(action:Action<S,number>) => Subscription<S, OnAnimationFrameOptions<S>>} */
export default action => [onanimationframe, { action }]
