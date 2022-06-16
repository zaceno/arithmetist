/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S @typedef {import('hyperapp').MaybeVNode<S>} MaybeVNode */
/** @template S @typedef {MaybeVNode<S> | MaybeVNode<S>[]} Content */

import {
  label as lbl,
  input,
  div,
  button as _button,
  span,
  text,
} from "@hyperapp/html"

/**
 * @template S
 * @param {string} name
 * @param {import('hyperapp').Props<S>} [props]
 */
export const icon = (name, props = {}) =>
  span({ ...props, class: [props.class, "icon"] }, text(name))

/**
 * @template S
 * @typedef ButtonProps
 * @prop {boolean} [disabled]
 * @prop {Action<S,Event> | [Action<S, any>, any] | false} [action]
 * @prop {import('hyperapp').ClassProp} [class]
 * @prop {string | Content<S>} label
 */

import withPreventDefault from "lib/io/with-prevent-default.js"

/**
 * @template S
 * @param {ButtonProps<S>} props
 */
export const button = ({ action, label, ...props }) =>
  _button(
    {
      disabled: props.disabled,
      class: ["button", props.class],
      ...(action
        ? {
            onclick: action,
            ontouchstart: withPreventDefault(action),
          }
        : {}),
    },
    typeof label === "string" ? text(label) : label
  )

/**
 * @param {object} props
 * @param {string} props.icon
 * @param {import('hyperapp').ClassProp} [props.class]
 */
export const badge = props =>
  div(
    {
      class: ["badge", props.class],
    },
    icon(props.icon)
  )

export const okBadge = () =>
  badge({
    icon: "check",
    class: "badge-ok",
  })

export const warnBadge = () =>
  badge({
    icon: "warning",
    class: "badge-warn",
  })
/**
 * @template S
 * @typedef {Omit<ButtonProps<S>, 'label'> & {name: string}} ClickableIconProps
 */

/**
 * @template S
 * @param {ClickableIconProps<S>} props
 */
export const clickableIcon = props =>
  button({
    ...props,
    class: ["clickable-icon", props.class],
    label: icon(props.name),
  })

/**
 * @template S
 * @typedef ToggleProps
 * @prop {boolean} on
 * @prop {Action<S, any> | [Action<S, any>, any]} OnToggle
 */

/**
 * @template S
 * @param {ToggleProps<S>} props
 * @param {string} label
 */
export const toggle = ({ on, OnToggle }, label) =>
  lbl({ class: "toggle" }, [
    text(label),
    input({ type: "checkbox", checked: on, oninput: OnToggle }),
    span(
      { class: "toggle-switch", hidden: true },
      icon("check", { class: "toggle-check" })
    ),
  ])

/**
 * @typedef GaugeProps
 * @prop {number} full
 * @prop {number} level
 */
/** @param {GaugeProps} props */
export const gauge = ({ full, level }) => {
  const width = full === 0 ? 0 : (100 * Math.min(level, full)) / full
  return div(
    {
      class: "gauge gauge-container",
    },
    div({
      class: "gauge-filler",
      style: {
        width: width + "%",
      },
    })
  )
}

/**
 * @template S
 * @typedef KeypadProps
 * @prop {Action<S, string>} [props.OnDigit]
 * @prop {Action<S, any> | [Action<S, any>, any]} [props.OnEnter]
 * @prop {Action<S, any> | [Action<S, any>, any]} [props.OnBack]
 */
/** @template S @param {KeypadProps<S>} props */
export const keypad = ({ OnDigit, OnBack, OnEnter }) =>
  div({ class: "keypad" }, [
    ..."123456789".split("").map(digit =>
      button({
        action: !!OnDigit && [OnDigit, digit],
        label: digit,
        class: "keypad-digit",
      })
    ),
    button({
      class: "keypad-back",
      action: OnBack,
      label: icon("backspace"),
    }),
    button({
      action: !!OnDigit && [OnDigit, "0"],
      label: "0",
      class: "keypad-digit",
    }),
    button({
      class: "keypad-enter",
      action: OnEnter,
      label: icon("check"),
    }),
  ])
