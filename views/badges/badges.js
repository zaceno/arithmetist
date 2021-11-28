import { div } from "@hyperapp/html"
export const incorrectBadge = () =>
  div({ key: "correct-badge", class: "badge badge-incorrect" })
export const correctBadge = () =>
  div({ key: "incorrect-badte", class: "badge badge-correct" })
