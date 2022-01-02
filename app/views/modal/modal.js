import clickableIcon from "@/views/clickable-icon/clickable-icon.js"
import { div } from "@hyperapp/html"

/**
 * @template S
 * @param {object} props
 * @param {boolean} props.visible
 * @param {boolean} props.animating
 * @param {Action<S, TransitionEvent>} props.OnTransitionEnd
 * @param {Action<S, MouseEvent>} props.Hide
 * @param {() => MaybeVNode<S> | MaybeVNode<S>[]} props.render
 */
export default ({ visible, animating, OnTransitionEnd, Hide, render }) =>
  visible &&
  div(
    {
      class: {
        "modal-overlay": true,
        "modal-animating": animating,
      },
      ontransitionend: OnTransitionEnd,
    },
    div(
      {
        class: {
          "modal-container": true,
          "modal-animating": animating,
        },
      },
      [
        div(
          { class: "modal-header" },
          clickableIcon({ name: "cancel", onclick: Hide })
        ),
        div({ class: "modal-content" }, render()),
      ]
    )
  )
