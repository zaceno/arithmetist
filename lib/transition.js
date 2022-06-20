/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */
import nextFrame from "lib/io/next-frame.js"

/** @typedef {0 | 1 | 2 | 3 | 4 } State */
/*
0 hidden completely,
1 will appear,
2 appearing,
3 showing,
4 hiding
*/

/**
 * @template S
 * @typedef Transition
 * @prop {Action<S, boolean | void>} Init
 * @prop {Action<S, any>} Show
 * @prop {Action<S, any>} Hide
 * @prop {Action<S, TransitionEvent>} OnTransitionEnd
 * @prop {(s:S) => {hidden: boolean, ready: boolean, appearing: boolean, visible:boolean, hiding: boolean}} status
 */

/**
 * @template S
 * @template [X=any]
 * @template [Y=any]
 * @param {object} props
 * @param {(s:S) => State} props.get
 * @param {(s:S, x:State) => S} props.set
 * @param {Action<S, any> | [Action<S, X>, X]} [props.OnDoneShowing]
 * @param {Action<S, any> | [Action<S, Y>, Y]} [props.OnDoneHiding]
 * @returns {Transition<S>}
 */
export default ({ get, set, OnDoneShowing, OnDoneHiding }) => {
  /** @type {Action<S, boolean | void>} */
  const Init = (state, showing = false) => set(state, showing ? 3 : 0)

  /** @type {Action<S, any>}*/
  const Show = state => {
    const mode = get(state)
    if (mode !== 0) return state
    return [
      state,
      nextFrame(state => [set(state, 1), nextFrame(state => set(state, 2))]),
    ]
  }

  /** @type {Action<S, any>} */
  const Hide = state => [
    state,
    nextFrame(state => (get(state) !== 3 ? state : set(state, 4))),
  ]

  /** @type {Action<S, any>}*/
  const DoneHiding = state => [
    set(state, 0),
    OnDoneHiding && (d => d(OnDoneHiding)),
  ]

  /** @type {Action<S, any>}*/
  const DoneShowing = state => [
    set(state, 3),
    OnDoneShowing && (d => d(OnDoneShowing)),
  ]

  /** @type {Action<S, any>}*/
  const OnTransitionEnd = state => {
    const mode = get(state)
    return mode === 2 ? DoneShowing : mode === 4 ? DoneHiding : state
  }

  /** @param {S} state */
  const status = state => {
    const mode = get(state)
    return {
      hidden: mode === 0,
      ready: mode === 1,
      appearing: mode === 2,
      visible: mode === 3,
      hiding: mode === 4,
    }
  }

  return {
    Init,
    Hide,
    Show,
    OnTransitionEnd,
    status,
  }
}
