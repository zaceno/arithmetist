import Settings from "./settings.js"
import Scoring from "./scoring.js"
import StartPage from "./start-page.js"
import ProblemPage from "./problem-page.js"
import CorrectPage from "./correct-page.js"
import IncorrectPage from "./incorrect-page.js"

/** @typedef {import('./start-page.js').State} StartPageState */
/** @typedef {import('./problem-page.js').State} ProblemPageState */
/** @typedef {import('./correct-page.js').State} CorrectPageState */
/** @typedef {import('./incorrect-page.js').State} IncorrectPageState */

/**
 * @typedef State
 * @prop {import('./settings.js').State} settings
 * @prop {import('./scoring.js').State} scoring
 * @prop {'start' | 'problem' | 'correct' | 'incorrect'} pageName
 * @prop { StartPageState | ProblemPageState | CorrectPageState | IncorrectPageState} pageState
 */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {(s:S) => State['pageName']} getPageName
 * @prop {Action<S, any>} BackToStart
 * @prop {import('./settings.js').Model<S>} settings
 * @prop {import('./scoring.js').Model<S>} scoring
 * @prop {(s:S) => State['scoring']} getScoreData
 * @prop {Action<S, State['scoring']>} SetScoreData
 * @prop {object} pages
 * @prop {import('./start-page.js').Model<S>} pages.start
 * @prop {import('./problem-page.js').Model<S>} pages.problem
 * @prop {import('./correct-page.js').Model<S>} pages.correct
 * @prop {import('./incorrect-page.js').Model<S>} pages.incorrect
 */

/**
 * @template S
 * @param {Props<S>} props
 * @returns {Model<S>}
 */
export default ({ get, set }) => {
  const settings = Settings({
    get: state => get(state)?.settings,
    set: (state, settings) => ({ ...(get(state) || {}), settings }),
  })

  const scoring = Scoring({
    get: state => get(state)?.scoring,
    set: (state, scoring) => ({ ...(get(state) || {}), scoring }),
  })

  const startPage = StartPage({
    get: state => /**@type {StartPageState}*/ (get(state)?.pageState),
    set: (state, pageState) =>
      set(state, { ...(get(state) || {}), pageState, pageName: "start" }),
    getMaxTable: settings.getMax,
    SetMaxTable: settings.SetMax,
    Next: () => NextProblem,
  })

  const correctPage = CorrectPage({
    get: state => /**@type {CorrectPageState}*/ (get(state)?.pageState),
    set: (state, pageState) =>
      set(state, { ...(get(state) || {}), pageState, pageName: "correct" }),
    Continue: () => NextProblem,
  })

  const incorrectPage = IncorrectPage({
    get: state => /**@type {IncorrectPageState}*/ (get(state)?.pageState),
    set: (state, pageState) =>
      set(state, { ...(get(state) || {}), pageState, pageName: "correct" }),
    Continue: () => NextProblem,
    Restart: () => startPage.Init,
  })

  const problemPage = ProblemPage({
    get: state => /** @type {ProblemPageState}*/ (get(state)?.pageState),
    set: (state, pageState) =>
      set(state, { ...(get(state) || {}), pageState, pageName: "problem" }),
    useTimer: settings.useTimer,
    Restart: () => startPage.Init,
    Check: (state, { left, right, answer }) => [
      state,
      [
        dispatch => {
          const correct = left * right === answer
          settings.keepScore(state) &&
            dispatch(scoring.Score, { left, right, correct })
          dispatch(correct ? correctPage.Init : correctPage.Init, {
            left,
            right,
          })
        },
        null,
      ],
    ],
  })

  /** @type {Action<S, any>}*/
  const Init = state => [
    set(state, /** @type {State}*/ ({})),
    [
      dispatch => {
        dispatch(settings.Init)
        dispatch(scoring.Init)
        dispatch(startPage.Init)
      },
      null,
    ],
  ]

  /** @type {Action<S, any>}*/
  const NextProblem = state => [
    problemPage.Init,
    scoring.getProblem(state, settings.getMax(state)),
  ]

  /** @param {S} state*/
  const getPageName = state => get(state).pageName

  /** @type {Action<S, any>} */
  const BackToStart = startPage.Init

  /** @param {S} state */
  const getScoreData = state => get(state)?.scoring

  /** @type {Action<S, State['scoring']>} */
  const SetScoreData = (state, scoring) =>
    set(state, { ...(get(state) || {}), scoring })

  return {
    Init,
    getPageName,
    scoring,
    settings,
    BackToStart,
    getScoreData,
    SetScoreData,
    pages: {
      start: startPage,
      problem: problemPage,
      correct: correctPage,
      incorrect: incorrectPage,
    },
  }
}
