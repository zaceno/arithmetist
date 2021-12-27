/**
 * @template S
 * @template {keyof WindowEventMap} E
 * @typedef OnWindowEventProps
 * @prop {E} name
 * @prop {Action<S, WindowEventMap[E]>} action
 */

/**
 * @template S
 * @template {keyof WindowEventMap} E
 * @param {Dispatch<S>} dispatch
 * @param {OnWindowEventProps<S, E>} options
 */
const onwindowevent = (dispatch, options) => {
  /** @param {WindowEventMap[typeof options.name]} ev */
  const handler = ev => dispatch(options.action, ev)
  window.addEventListener(options.name, handler)
  return () => {
    window.removeEventListener(options.name, handler)
  }
}

/**
 * @template S
 * @template {keyof WindowEventMap} E
 * @param {E} name
 * @param {Action<S, WindowEventMap[E]>} action
 * @returns {Subscription<S, OnWindowEventProps<S,E>>}
 */
export default (name, action) => [onwindowevent, { name, action }]
