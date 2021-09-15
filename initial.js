import { button, text, section } from "./lib/html.js"
import { NextProblem } from "./actions.js"

/** @param {import('./actions.js').State} state */
export default state =>
  section(
    { class: "view view-initial" },
    button({ onclick: NextProblem }, text("start"))
  )
