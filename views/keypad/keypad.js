import { div } from "@hyperapp/html"
import button from "../button/button.js"

/**
 * @template S
 * @param {object} [props]
 * @param {boolean} [props.disabled]
 * @param {Action<S, string>} [props.OnDigit]
 * @param {Action<S, any>} [props.OnEnter]
 * @param {Action<S, any>} [props.OnBack]
 */
export default ({ OnDigit, OnEnter, OnBack, disabled } = {}) =>
  div({ class: "keypad" }, [
    ..."123456789".split("").map(digit =>
      button({
        action: !!OnDigit && [OnDigit, digit],
        disabled,
        label: digit,
      })
    ),
    button({ classext: "keypad-back", action: OnBack, disabled, label: "<" }),
    button({ action: !!OnDigit && [OnDigit, "0"], disabled, label: "0" }),
    button({ classext: "keypad-enter", action: OnEnter, disabled, label: "E" }),
  ])
