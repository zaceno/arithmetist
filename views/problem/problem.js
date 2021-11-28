import { p, text } from "@hyperapp/html"

/**
 * @param {object} props
 * @param {number} props.left
 * @param {number} props.right
 * @param {number|string} props.answer
 */
export default ({ left, right, answer }) =>
  p({ class: "problem" }, text(`${left} x ${right} = ${answer}`))
