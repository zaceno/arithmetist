/** @template S @typedef {import('hyperapp').Dispatch<S>} Dispatch */
/** @template S,X @typedef {import('hyperapp').Dispatchable<S,X>} Dispatchable */
/** @template S,X @typedef {import('hyperapp').Effect<S,X>} Effect */

/**
 * @template S,X
 * @typedef TransitionProps
 * @prop {string} selector
 * @prop {Dispatchable<S,X>} onend
 */

/**
 * @template S,X
 * @param {Dispatch<S>} dispatch
 * @param {TransitionProps<S,X>} options
 * @returns {void}
 */
const transition = (dispatch, options) => {
  /** @param {Event} ev*/
  const handler = ev => {
    ev.target?.removeEventListener("transitionend", handler)
    dispatch(options.onend, ev)
  }

  const start = () => {
    let elem = document.querySelector(options.selector)
    if (!elem) return
    if (elem.classList.contains("transition")) return
    elem.classList.add("transition")
    elem.addEventListener("transitionend", handler)
  }

  requestAnimationFrame(() => requestAnimationFrame(start))
}

/**
 * @template S,X
 * @param {string} selector
 * @param {Dispatchable<S,X>} onend
 * @returns {Effect<S, TransitionProps<S,X>>}
 */
export default (selector, onend) => [transition, { selector, onend }]
