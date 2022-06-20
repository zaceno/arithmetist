import Transition from "lib/transition.js"
import { div } from "@hyperapp/html"
import { page, problem, nextButton, backButton } from "app/views.js"
import { gauge, okBadge } from "lib/widgets/widgets.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/**
 * @typedef State
 * @prop {import('lib/transition.js').State} transition
 * @prop {number} left
 * @prop {number} right
 */
/**
 * @template S
 * @typedef CorrectPage
 * @prop {(s:S) => {left:number, right:number}} problem
 * @prop {import('lib/transition.js').Transition<S>} exiter
 * @prop {Action<S, {left: number, right: number}>} Init
 * @prop {Action<S, any>} Problem
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

  /**
   * @param {S} state
   */
  const view = state => {
    const { left, right } = get(state)
    const exitStatus = exiter.status(state)
    return page({
      top: [backButton({ disabled: true }), gauge({ full: 1, level: 1 })],
      main: [
        problem({ left, right, answer: left * right }),
        !exitStatus.hidden &&
          div(
            {
              ontransitionend: exiter.OnTransitionEnd,
              class: {
                badgeContainer: true,
                badgePopping: exitStatus.hiding,
              },
            },
            okBadge()
          ),
      ],
      bottom: nextButton({ disabled: true }),
    })
  }

  return { Init, view, subs: () => [] }
}
