import { div } from "@hyperapp/html"

/**
 * @param {object} [props={}]
 * @param {ClassProp} [props.class='']
 */
export const incorrectBadge = props =>
  div({
    key: "correct-badge",
    class: ["badge badge-incorrect", props?.class || ""],
  })
/**
 * @param {object} props
 * @param {ClassProp} [props.class='']
 */
export const correctBadge = props =>
  div({
    key: "incorrect-badte",
    class: ["badge badge-correct", props?.class || ""],
  })
