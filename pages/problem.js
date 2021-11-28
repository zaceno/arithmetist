import wireTimer from "../models/timer.js"
import wireEntry from "../models/entry.js"
import pageContainer from "../views/page/page.js"
import gauge from "../views/gauge/gauge.js"
import keypad from "../views/keypad/keypad.js"
import problem from "../views/problem/problem.js"
import { backButton } from "../views/nav-buttons/nav-buttons.js"
/** @template S @typedef {import('../models/scoring.js').Model<S>} ScoringModel */
/** @template S @typedef {import('../models/settings.js').Model<S>} SettingsModel */
/** @template S @typedef {import('../models/entry.js').Model<S>} EntryModel */
/** @template S @typedef {import('../models/timer.js').Model<S>} TimerModel */
/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 * @prop {import('../models/entry.js').State} entry
 * @prop {import('../models/timer.js').State} timer
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, {left:number, right:number}>} Init
 * @prop {Getter<S, ElementVNode<S>>} view
 * @prop {Getter<S, (false | Subscription<S, any>)[]>} subs
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {Action<S, any>} props.OnCorrect
 * @param {Action<S, any>} props.OnIncorrect
 * @param {Action<S, any>} props.Back
 * @param {SettingsModel<S>} props.settings
 * @param {ScoringModel<S>} props.scoring
 * @returns {Model<S>}
 */
export default ({
  get,
  set,
  OnCorrect,
  OnIncorrect,
  Back,
  scoring,
  settings,
}) => {
  /** @type {Action<S, any>}*/
  const Init = state => [
    set(
      state,
      /** @type {State}*/ (scoring.getProblem(state, settings.getMax(state)))
    ),
    [
      dispatch => {
        dispatch(entry.Init, "")
        dispatch(timer.Reset, settings.useTimer(state) ? 7000 : 0)
        dispatch(timer.Start, performance.now())
      },
      null,
    ],
  ]

  /** @type {Action<S, any>}*/
  const Finish = state => {
    let { left, right } = get(state)
    let answer = entry.getValue(state)
    let correct = left * right === answer
    return [
      state,
      [
        disp => {
          settings.keepScore(state) &&
            disp(scoring.Score, { left, right, correct })
          disp(correct ? OnCorrect : OnIncorrect, { left, right })
        },
        null,
      ],
    ]
  }

  /** @type {EntryModel<S>}*/
  const entry = wireEntry({
    get: state => get(state).entry,
    set: (state, entry) => set(state, { ...get(state), entry }),
  })

  /** @type {TimerModel<S>} */
  const timer = wireTimer({
    get: state => get(state).timer,
    set: (state, timer) => set(state, { ...get(state), timer }),
    onStart: x => x,
    onTimeout: Finish,
  })

  /** @param {S} state */
  const view = state => {
    let { left, right } = get(state)
    return pageContainer({ classext: "problempage" }, [
      gauge(timer.gaugeProps(state)),
      backButton({ action: Back }),
      problem({
        left: left,
        right: right,
        answer: entry.getEntry(state),
      }),
      keypad({
        OnDigit: entry.Digit,
        OnBack: entry.Back,
        OnEnter: Finish,
      }),
    ])
  }

  /** @param {S} state */
  const subs = state => {
    let { timer: t } = get(state)
    return !!t ? timer.subs(state) : []
  }

  return { Init, subs, view }
}
