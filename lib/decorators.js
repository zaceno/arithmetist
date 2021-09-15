/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */

/**
 * @template S
 * @param {Action<S, string>} action
 * @returns {Action<S,Event>}
 */
export const withTargetValue = action => (_, event) =>
  [action, /** @type {HTMLInputElement} */ (event.target).value]

/**
 * @template S
 * @param {Action<S, number>} action
 * @returns {Action<S,Event>}
 */
export const withNumericTargetValue = action => (_, event) =>
  [action, +(/** @type {HTMLInputElement} */ (event.target).value)]

/**
 * @template S,X
 * @param {Action<S, Event> | [Action<S,X>, X]} action
 * @returns {Action<S, Event>}
 */
export const withPreventDefault = action => (_, event) => {
  event.preventDefault()
  return Array.isArray(action) ? action : [action, event]
}
