/** @type {Record<string, boolean>} */
const didRun = {}

/**
 * @template S,X
 * @param {Dispatch<S>} dispatch
 * @param {object} options
 * @param {string} options.key
 * @param {X} options.data
 * @param {Action<S, X>} options.SetData
 */
export default (dispatch, options) => {
  if (!didRun[options.key]) {
    didRun[options.key] = true
    const json = localStorage.getItem(options.key)
    if (!!json) {
      let data = /** @type {X}*/ (JSON.parse(json))
      requestAnimationFrame(() => {
        dispatch(options.SetData, data)
      })
    }
  } else {
    localStorage.setItem(options.key, JSON.stringify(options.data))
  }
  return () => {}
}
