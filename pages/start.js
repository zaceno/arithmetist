import pageContainer from "../views/page/page.js"
import maxSetter from "../views/max-setter/max-setter.js"
import checkbox from "../views/checkbox/checkbox.js"
import { startButton } from "../views/nav-buttons/nav-buttons.js"
import scoreDisplay from "../views/score/score.js"
/** @typedef {null} State */
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
export default ({ set, scoring, settings, Start }) => {
  /** @type {Action<S, any>} */
  const Init = state => set(state, null)

  /** @type {Action<S, any>} */
  const StartWithProblem = state => [
    Start,
    scoring.getProblem(state, settings.getMax(state)),
  ]

  /** @param {S} state */
  const view = state =>
    pageContainer({ classext: "startpage" }, [
      scoreDisplay({ value: scoring.getScore(state) }),
      maxSetter({
        ratios: scoring.getRatios(state),
        SetMax: settings.SetMax,
        max: settings.getMax(state),
        min: 2,
      }),
      checkbox({
        label: "Practice mode",
        value: settings.isPracticeMode(state),
        toggle: settings.TogglePractice,
        extra: "No timer & no score",
      }),
      startButton({ action: StartWithProblem }),
    ])

  /** @param {S} _*/
  const subs = _ => []

  return { Init, view, subs }
}
