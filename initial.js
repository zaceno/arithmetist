import { p, button, text, section, input } from "./lib/html.js"
import { NextProblem, SetMax } from "./actions.js"
import { withNumericTargetValue } from "./lib/decorators.js"
import { getScore } from "./scoreboard.js"
/** @param {import('./actions.js').State} state */
export default state =>
  section({ class: "view view-initial" }, [
    p(text("Score: " + getScore(state.score))),
    p([
      text("Max:" + state.max),
      input({
        type: "range",
        value: state.max,
        min: 2,
        max: 12,
        step: 1,
        oninput: withNumericTargetValue(SetMax),
      }),
    ]),
    p([button({ class: "startbutton", onclick: NextProblem }, text("\u27A9"))]),
  ])
