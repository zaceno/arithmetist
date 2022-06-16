import { page, problem, nextButton, backButton } from "app/views/common.js"
import { gauge, warnBadge } from "lib/widgets/widgets.js"
/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */
/**
 * @template S
 * @param {object} props
 * @param {number} props.left
 * @param {number} props.right
 * @param {Action<S, any> | [Action<S, any>, any]} props.Start
 * @param {Action<S, any> | [Action<S, any>, any]} props.Problem
 */
export default ({ left, right, Start, Problem }) =>
  page({
    top: [backButton({ action: Start }), gauge({ full: 1, level: 1 })],
    main: [problem({ left, right, answer: left * right }), warnBadge()],
    bottom: nextButton({ action: Problem }),
  })
