import { div, button, text } from "../../lib/html.js"
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
      ontouchstart: [props.onclick, props.digit],
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
export default props =>
  div({ class: "keypad" }, [
    digitButton({ digit: 1, onclick: props.onEnterDigit }),
    digitButton({ digit: 2, onclick: props.onEnterDigit }),
    digitButton({ digit: 3, onclick: props.onEnterDigit }),
    digitButton({ digit: 4, onclick: props.onEnterDigit }),
    digitButton({ digit: 5, onclick: props.onEnterDigit }),
    digitButton({ digit: 6, onclick: props.onEnterDigit }),
    digitButton({ digit: 7, onclick: props.onEnterDigit }),
    digitButton({ digit: 8, onclick: props.onEnterDigit }),
    digitButton({ digit: 9, onclick: props.onEnterDigit }),
    button(
      {
        class: "button-back",
        ontouchstart: props.onBack,
        onmousedown: props.onBack,
      },
      text("\u21D0")
    ),
    digitButton({ digit: 0, onclick: props.onEnterDigit }),
    button(
      {
        class: "button-done",
        onttouchstart: props.onDone,
        onmousedown: props.onDone,
      },
      text("\u2713")
    ),
  ])
