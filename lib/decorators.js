/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */

/**
 * @template S
 * @param {Action<S, string>} action
 * @returns {Action<S,Event>}
 */
export const withTargetValue = action => (state, event) =>
  [action, /** @type {HTMLInputElement} */ (event.target).value]
