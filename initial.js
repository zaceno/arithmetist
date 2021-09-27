import { p, br, button, text, section, input, div } from "./lib/html.js"
import { NextProblem, SetMax } from "./actions.js"
import { withNumericTargetValue } from "./lib/decorators.js"
import { getScore, getRatios } from "./scoreboard.js"
/** @typedef {import('./actions.js').State} State */
/** @template X @typedef {import('./actions.js').Action<X>} Action */
/** @typedef {import('./scoreboard.js').Scoreboard} Scoreboard */

/**
 * @param {object} props
 * @param {Scoreboard} props.scoreboard
 * @param {number} props.max
 * @param {Action<number>} props.OnSetMax
 */
const scoreSetting = props =>
  div([
    ...getRatios(props.scoreboard).map((ratio, index) =>
      div(
        {
          style: {
            display: "inline-block",
            backgroundColor:
              index + 1 <= props.max
                ? `hsla(${ratio * 100} , 80%, 40%)`
                : "#555",
            border: "1px #fff solid",
            fontSize: "0.7em",
            boxSizing: "border-box",
            width: "26px",
            height: "25px",
            lineHeight: "25px",
            textAlign: "center",
            marginLeft: "-1px",
          },
        },
        text(index + 1)
      )
    ),
    br(),
    input({
      style: {
        backgroundColor: "#fff",
        width: "300px",
      },
      border: "1px white solid",
      type: "range",
      value: props.max,
      min: 1,
      max: 12,
      step: 1,
      oninput: withNumericTargetValue(SetMax),
    }),
  ])

/**@param {State} state */
export default state =>
  section({ class: "view view-initial" }, [
    scoreSetting({
      scoreboard: state.score,
      max: state.max,
      OnSetMax: SetMax,
    }),
    p(),
    p(text("Score: " + getScore(state.score))),
    p([button({ class: "startbutton", onclick: NextProblem }, text("\u27A9"))]),
  ])
