import { p, text } from "@hyperapp/html"

/**
 * @param {object} props
 * @param {number} props.value
 */
export default ({ value }) => p({ class: "score" }, text("SCORE: " + value))
