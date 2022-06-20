import { page, problem, nextButton, backButton } from "app/views.js"
import { gauge, warnBadge } from "lib/widgets/widgets.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
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
export default ({ get, set, Start, Problem }) => {
  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, x) => set(state, x)

  /** @param {S} state*/
  const view = state => {
    const { left, right } = get(state)
    return page({
      top: [backButton({ action: Start }), gauge({ full: 1, level: 1 })],
      main: [problem({ left, right, answer: left * right }), warnBadge()],
      bottom: nextButton({ action: Problem }),
    })
  }
  return { Init, view, subs: () => [] }
}
