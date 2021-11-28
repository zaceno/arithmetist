/**
 * @template S,X,Y
 * @param {ActionLike<S,X,Y>} action
 * @returns {Action<S, Event>}
 */
export default action => (_, event) => {
  event.preventDefault()
  return Array.isArray(action) ? action : [action, event]
}
