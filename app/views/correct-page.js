import { div } from "@hyperapp/html"
import { page, problem, nextButton, backButton } from "app/views/common.js"
import { gauge, okBadge } from "lib/widgets/widgets.js"
/** @typedef {import('lib/widgets/widgets.js').GaugeProps} GaugeProps */
/** @template S @typedef {import('lib/transition.js').TransitionModel<S>} TransitionModel */
/**
 * @template S
 * @param {object} props
 * @param {number} props.left
 * @param {number} props.right
 * @param {TransitionModel<S>} props.badgeTransition
 */
export default ({ left, right, badgeTransition }) =>
  page({
    top: [backButton({ disabled: true }), gauge({ full: 1, level: 1 })],
    main: [
      problem({ left, right, answer: left * right }),
      !badgeTransition.status.hidden &&
        div(
          {
            ontransitionend: badgeTransition.OnTransitionEnd,
            class: {
              badgeContainer: true,
              badgePopping: badgeTransition.status.hiding,
            },
          },
          okBadge()
        ),
    ],
    bottom: nextButton({ disabled: true }),
  })
