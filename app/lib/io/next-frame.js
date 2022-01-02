/**
 * @template S
 * @type {Effecter<S, Action<S, void>>}
 */
const nextFrame = (dispatch, action) => {
  requestAnimationFrame(() => {
    dispatch(action)
  })
}

/**
 * @template S
 * @param {Action<S, void>} action
 * @returns {Effect<S, Action<S,void>>}
 */
export default action => [nextFrame, action]
