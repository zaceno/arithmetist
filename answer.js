import { button, text, section } from "./lib/html.js"
import problem from "./views/problem.js"
import badge from "./views/badge/badge.js"
import { getScore } from "./scoreboard.js"
import { NextProblem } from "./actions.js"

/** @param {import('./actions.js').State} state */
export default state =>
  section({ class: "view view-answer" }, [
    text("SCORE" + getScore(state.score)),
    problem({ left: state.left, right: state.right }),
    badge(
      state.answer === "" + state.left * state.right ? "correct" : "incorrect"
    ),
    button({ class: "button-next", onclick: NextProblem }, text("\u27A9")),
  ])
