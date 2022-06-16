/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S, X @typedef {import('hyperapp').Subscription<S, X>} Subscription */
/** @template S @typedef {(s:S) => (Subscription<S,any> | boolean | undefined )[]} Subs */

import Transition from "lib/transition.js"
import pageView from "app/views/correct-page.js"

/**
 * @typedef State
 * @prop {import('lib/transition.js').State} transition
 * @prop {number} left
 * @prop {number} right
 */

/**
 * @template S
 * @param {object} props
 * @param {(s:S) => State} props.get
 * @param {(s:S, x:State) => S} props.set
 * @param {Action<S, any>} props.Problem
 */
export default ({ get, set, Problem }) => {
  const exiter = Transition({
    get: state => get(state)?.transition,
    set: (state, transition) =>
      set(state, { ...(get(state) || {}), transition }),
    OnDoneHiding: Problem,
  })

  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) => [
    set(state, /** @type {State}*/ ({ left, right })),
    dispatch => {
      dispatch(exiter.Init, true)
      dispatch(exiter.Hide)
    },
  ]

  /** @param {S} state */
  const view = state => {
    const { left, right } = get(state)
    const badgeTransition = exiter.model(state)
    return pageView({ left, right, badgeTransition })
  }

  /** @type {Subs<S>}*/
  const subs = _ => []

  return { Init, view, subs }
}
