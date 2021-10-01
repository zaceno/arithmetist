import { button } from "@hyperapp/html"
import { withPreventDefault } from "lib/decorators.js"

/**
 * @template S
 * @param {object} props
 * @param {boolean} [props.disabled]
 * @param {import('hyperapp').Action<S, any>} props.onclick
 */
export default props =>
  button({
    class: "backbutton",
    disabled: props.disabled,
    ontouchstart: withPreventDefault(props.onclick),
    onmousedown: props.onclick,
  })
