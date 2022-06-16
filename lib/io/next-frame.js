/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */
/** @template S @typedef {import('hyperapp').Dispatch<S>} Dispatch */

/**
 * @template S
 * @param {Action<S, any> | [Action<S, any>, any]} action
 * @returns {(d:Dispatch<S>) => void}
 */
export default action => dispatch => {
  requestAnimationFrame(() => {
    dispatch(action)
  })
}
