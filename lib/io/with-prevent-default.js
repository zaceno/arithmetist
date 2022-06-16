/** @template S,X @typedef {import('hyperapp').Action<S, X>} Action */

/**
 * @template S
 * @template [X=any]
 * @param {Action<S, Event> | [Action<S,X>, X]} action
 * @returns {Action<S, Event>}
 */
export default action => (_, event) => {
  event.preventDefault()
  return Array.isArray(action) ? action : [action, event]
}
