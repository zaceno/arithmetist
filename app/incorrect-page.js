import pageView from "app/views/incorrect-page.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S, X @typedef {import('hyperapp').Subscription<S, X>} Subscription */
/** @template S @typedef {(s:S) => (Subscription<S,any> | boolean | undefined)[]} Subs */
/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 */
/**
 * @template S
 * @param {object} props
 * @param {(s:S) => State} props.get
 * @param {(s:S, x:State) => S} props.set
 * @param {Action<S, any>} props.Problem
 * @param {Action<S, any>} props.Start
 */
export default ({ get, set, Start, Problem }) => ({
  /** @type {Action<S, {left: number, right: number}>}*/
  Init: (state, x) => set(state, x),

  /** @param {S} state */
  view: state => pageView({ ...get(state), Start, Problem }),

  /** @type {Subs<S>}*/
  subs: _ => [],
})
