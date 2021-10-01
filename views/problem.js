import { p, text } from "@hyperapp/html"

/**
 * @param {object} props
 * @param {number} props.left
 * @param {number} props.right
 * @param {string} [props.answer]
 */
export default props =>
  p(
    { class: "problem" },
    text(
      `${props.left} \u00D7 ${props.right} = ${
        "answer" in props ? props.answer : "" + props.left * props.right
      }`
    )
  )
