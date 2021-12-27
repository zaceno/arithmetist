import { input, p, text, label, span, div } from "@hyperapp/html"
import pageContainer from "../views/page/page.js"
import MaxSetter from "../max-setter/max-setter.js"
import { startButton } from "../views/nav-buttons/nav-buttons.js"

/** @typedef {import('../max-setter/max-setter.js').State} State */
/** @template S @typedef {import('../models/scoring.js').Model<S>} ScoringModel */
/** @template S @typedef {import('../models/settings.js').Model<S>} SettingsModel */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {(s:S) => ElementVNode<S>} view
 * @prop {(s:S) => (false | Subscription<S, any>)[]} subs
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get,
 * @param {Setter<S, State>} props.set,
 * @param {ScoringModel<S>} props.scoring
 * @param {SettingsModel<S>} props.settings
 * @param {Action<S, {left: number, right: number}>} props.Start
 * @returns {Model<S>}
 */
export default ({ get, set, scoring, settings, Start }) => {
  const maxSetter = MaxSetter({
    get,
    set,
    getMax: settings.getMax,
    SetMax: settings.SetMax,
    getRatios: scoring.getRatios,
  })

  /** @type {Action<S, any>} */
  const Init = maxSetter.Init

  /** @type {Action<S, any>} */
  const StartWithProblem = state => [
    Start,
    scoring.getProblem(state, settings.getMax(state)),
  ]

  /** @param {S} state */
  const view = state =>
    pageContainer({ classext: "startpage" }, [
      div(
        {
          class: "score-display",
          style: {
            position: "absolute",
            top: "4rem",
            left: "15px",
            right: "15px",
          },
        },
        [
          p(
            {
              class: "score-display-label",
              style: {
                padding: "0",
                margin: "0",
                fontSize: "1.4rem",
                textAlign: "center",
              },
            },
            text("Score: ")
          ),
          p(
            {
              class: "score-display-value",
              style: {
                fontSize: "2.7rem",
                textAlign: "center",
                padding: "0",
                margin: "0",
              },
            },
            text(scoring.getScore(state))
          ),
        ]
      ),
      div({ class: "max-setter" }, [p(text("Tables:")), maxSetter.view(state)]),
      p(
        { class: "practice-mode-toggle" },
        label([
          input({
            style: { display: "none" },
            type: "checkbox",
            checked: settings.isPracticeMode(state),
            oninput: settings.TogglePractice,
          }),
          span(
            { class: "material-icons" },
            text(settings.isPracticeMode(state) ? "check_circle" : "circle")
          ),
          text("Practice mode"),
        ])
      ),
      startButton({ action: StartWithProblem }),
    ])

  const subs = maxSetter.subs

  return { Init, view, subs }
}
