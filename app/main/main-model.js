import Settings from "../settings-model.js"
import Scoring from "../scoring-model.js"
import StartPage from "../pages/start/start-page-model.js"
import ProblemPage from "../pages/problem-page/problem-page-model.js"
import CorrectPage from "../pages/correct/correct-page-model.js"
import IncorrectPage from "../pages/incorrect/incorrect-page-model.js"

/** @typedef {import('../pages/start/start-page-model.js').State} StartPageState */
/** @typedef {import('../pages/problem-page/problem-page-model.js').State} ProblemPageState */
/** @typedef {import('../pages/correct/correct-page-model.js').State} CorrectPageState */
/** @typedef {import('../pages/incorrect/incorrect-page-model.js').State} IncorrectPageState */

/**
 * @typedef State
 * @prop {import('../settings-model.js').State} settings
 * @prop {import('../scoring-model.js').State} scoring
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
 * @prop {import('../settings-model.js').Model<S>} settings
 * @prop {import('../scoring-model.js').Model<S>} scoring
 * @prop {(s:S) => State['scoring']} getScoreData
 * @prop {Action<S, State['scoring']>} SetScoreData
 * @prop {object} pages
 * @prop {import('../pages/start/start-page-model.js').Model<S>} pages.start
 * @prop {import('../pages/problem-page/problem-page-model.js').Model<S>} pages.problem
 * @prop {import('../pages/correct/correct-page-model.js').Model<S>} pages.correct
 * @prop {import('../pages/incorrect/incorrect-page-model.js').Model<S>} pages.incorrect
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
