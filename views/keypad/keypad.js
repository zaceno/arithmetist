import { div, button, text } from "../../lib/html.js"
import { withPreventDefault } from "../../lib/decorators.js"
/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */

/**
 * @template S
 * @param {object} props
 * @param {number} props.digit
 * @param {Action<S, number>} props.onclick
 */
const digitButton = props =>
  button(
    {
      ontouchstart: withPreventDefault([props.onclick, props.digit]),
      onmousedown: [props.onclick, props.digit],
    },
    text(props.digit)
  )

/**
 * @template S
 * @param {object} props
 * @param {Action<S, number>} props.onEnterDigit
 * @param {Action<S, any>} props.onBack
 * @param {Action<S, any>} props.onDone
 */
export default props => {
  /** @param {number} n */
  const digits = [...Array(10).keys()].map(n =>
    digitButton({ digit: n, onclick: props.onEnterDigit })
  )
  const back = button(
    {
      class: "button-back",
      ontouchstart: withPreventDefault(props.onBack),
      onmousedown: props.onBack,
    },
    text("\u21D0")
  )

  const check = button(
    {
      class: "button-done",
      onttouchstart: withPreventDefault(props.onDone),
      onmousedown: props.onDone,
    },
    text("\u2713")
  )

  return div({ class: "keypad" }, [...digits.slice(1), back, digits[0], check])
}
