import { button } from "@hyperapp/html"
import { icon } from "./icons.js"

/**
 * @template S
 * @param {object} props
 * @param {string} props.name
 * @param {Action<S, MouseEvent>} props.onclick
 */
export default ({ name, onclick }) =>
  button(
    {
      class: "clickable-icon",
      onclick,
    },
    icon(name)
  )
