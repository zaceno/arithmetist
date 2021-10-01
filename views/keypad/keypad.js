import { div, button, text } from "@hyperapp/html"
import { withPreventDefault } from "lib/decorators.js"
/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */

/**
 * @template S
 * @param {object} props
 * @param {number} props.digit
 * @param {Action<S, number>} props.onclick
 * @param {boolean} [props.disabled]
 */
const digitButton = props =>
  button(
    {
      ontouchstart: withPreventDefault([props.onclick, props.digit]),
      onclick: [props.onclick, props.digit],
      disabled: props.disabled,
    },
    text(props.digit)
  )

/**
 * @template S
 * @param {object} props
 * @param {Action<S, number>} props.onEnterDigit
 * @param {Action<S, any>} props.onBack
 * @param {Action<S, any>} props.onDone
 * @param {boolean} [props.disabled]
 */
export default props => {
  /** @param {number} n */
  const digits = [...Array(10).keys()].map(n =>
    digitButton({
      digit: n,
      onclick: props.onEnterDigit,
      disabled: props.disabled,
    })
  )
  const back = button(
    {
      class: "button-back",
      ontouchstart: withPreventDefault(props.onBack),
      onclick: props.onBack,
      disabled: props.disabled,
    },
    text("\u21D0")
  )

  const check = button(
    {
      class: "button-done",
      onttouchstart: withPreventDefault(props.onDone),
      onclick: props.onDone,
      disabled: props.disabled,
    },
    text("\u2713")
  )

  return div({ class: "keypad" }, [...digits.slice(1), back, digits[0], check])
}
