import { button, text } from "@hyperapp/html"
import withPreventDefault from "../../io/with-prevent-default.js"

/**
 * @template S,X
 * @param {object} props,
 * @param {boolean} [props.disabled],
 * @param {ClassProp} [props.classext],
 * @param {ActionLike<S,Event,X>| false} [props.action]
 * @param {string | MaybeVNode<S> | MaybeVNode<S>[]} props.label
 */
export default ({ action, label, disabled = false, classext = "" }) =>
  button(
    {
      class: ["button", classext],
      disabled,
      ...(action
        ? {
            onclick: action,
            ontouchstart: withPreventDefault(action),
          }
        : {}),
    },
    typeof label === "string" ? text(label) : label
  )
