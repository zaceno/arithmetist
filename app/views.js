/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S @typedef {import('lib/widgets/widgets.js').ButtonProps<S>} ButtonProps */
/** @template S @typedef {import('hyperapp').MaybeVNode<S>} MaybeVNode */
/** @template S @typedef {MaybeVNode<S> | MaybeVNode<S>[]} Content */

import { clickableIcon, icon, button } from "lib/widgets/widgets.js"
import { h1, main, div, text } from "@hyperapp/html"

/**
 * @template S
 * @param {object} props
 * @param {ButtonProps<S>['action']} [props.action]
 * @param {ButtonProps<S>['disabled']} [props.disabled]
 */
export const backButton = ({ action, disabled }) =>
  clickableIcon({
    name: "keyboard_double_arrow_left",
    action,
    disabled,
  })

/**
 * @template S
 * @param {object} props
 * @param {ButtonProps<S>['action']} [props.action]
 * @param {ButtonProps<S>['disabled']} [props.disabled]
 */
export const nextButton = ({ action, disabled }) =>
  button({
    disabled,
    action,
    class: "nextbutton",
    label: [text("Next"), icon("keyboard_double_arrow_right")],
  })

/**
 * @template S
 * @param {object} props
 * @param {Content<S>} props.top
 * @param {Content<S>} props.main
 * @param {Content<S>} props.bottom
 */
export const page = ({ top, main: mn, bottom }) =>
  main({ class: "page" }, [
    div({ class: "page-top" }, top),
    div({ class: "page-main" }, mn),
    div({ class: "page-bottom" }, bottom),
  ])

/**
 * @typedef ProblemProps
 * @prop {number} left
 * @prop {number} right
 * @prop {number|string} answer
 */
/** @param {ProblemProps} props */
export const problem = ({ left, right, answer }) =>
  h1({ class: "problem" }, text(`${left} x ${right} = ${answer}`))
