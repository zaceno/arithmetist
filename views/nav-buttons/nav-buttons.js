import button from "../button/button.js"
import { span, text } from "@hyperapp/html"

/**
 * @template S,X
 * @param {object} props,
 * @param {boolean} [props.disabled],
 * @param {ActionLike<S,Event,X>| false} [props.action]
 */
export const backButton = ({ action, disabled }) =>
  button({
    action,
    disabled,
    classext: "nav-button-back",
    label: "Back",
  })

/**
 * @template S,X
 * @param {object} props,
 * @param {boolean} [props.disabled],
 * @param {ActionLike<S,Event,X>| false} [props.action]
 */
export const nextButton = ({ action, disabled }) =>
  button({
    action,
    disabled,
    classext: "nav-button-next",
    label: "Next",
  })

/**
 * @template S,X
 * @param {object} props,
 * @param {boolean} [props.disabled],
 * @param {ActionLike<S,Event,X>| false} [props.action]
 */
export const startButton = ({ action, disabled }) =>
  button({
    action,
    disabled,
    classext: "nav-button-start",
    label: span({ class: "material-icons" }, text("play_circle")),
  })
