import { app } from "hyperapp"
import persistence from "@/lib/io/persistence.js"
import StartPage from "./start-page.js"
import ProblemPage from "./problem-page.js"
import CorrectPage from "./correct-page.js"
import IncorrectPage from "./incorrect-page.js"
import Settings from "./settings-model.js"
import Scoring from "./scoring-model.js"

/** @typedef {import('./start-page.js').State} StartPageState */
/** @typedef {import('./problem-page.js').State} ProblemPageState */
/** @typedef {import('./correct-page.js').State} CorrectPageState */
/** @typedef {import('./incorrect-page.js').State} IncorrectPageState */

/**
 * @typedef State
 * @prop {import('./settings-model.js').State} settings
 * @prop {import('./scoring-model.js').State} scoring
 * @prop {'start' | 'problem' | 'correct' | 'incorrect'} pageName
 * @prop { StartPageState | ProblemPageState | CorrectPageState | IncorrectPageState} pageState
 */

const settings = Settings({
  get: state => state.settings,
  set: (state, settings) => ({ ...state, settings }),
})

const scoring = Scoring({
  get: state => state.scoring,
  set: (state, scoring) => ({ ...state, scoring }),
})

const startPage = StartPage({
  get: state => /**@type {StartPageState}*/ (state.pageState),
  set: (state, pageState) => ({
    ...state,
    pageState,
    pageName: /** @type {const}*/ ("start"),
  }),
  settings,
  scoring,
  Next: () => NextProblem,
})

const correctPage = CorrectPage({
  get: state => /**@type {CorrectPageState}*/ (state.pageState),
  set: (state, pageState) => ({
    ...state,
    pageState,
    pageName: /** @type {const}*/ ("correct"),
  }),
  Continue: () => NextProblem,
})

const incorrectPage = IncorrectPage({
  get: state => /**@type {IncorrectPageState}*/ (state.pageState),
  set: (state, pageState) => ({
    ...state,
    pageState,
    pageName: /** @type {const}*/ ("incorrect"),
  }),
  Continue: () => NextProblem,
  Restart: () => startPage.Init,
})

const problemPage = ProblemPage({
  get: state => /** @type {ProblemPageState}*/ (state.pageState),
  set: (state, pageState) => ({
    ...state,
    pageState,
    pageName: /** @type {const}*/ ("problem"),
  }),
  settings,
  Restart: () => startPage.Init,
  Check: (state, { left, right, answer }) => [
    state,
    [
      dispatch => {
        const correct = left * right === answer
        settings.keepScore(state) &&
          dispatch(scoring.Score, { left, right, correct })
        dispatch(correct ? correctPage.Init : incorrectPage.Init, {
          left,
          right,
        })
      },
      null,
    ],
  ],
})

/** @type {Action<State, any>}*/
const Init = () => [
  /** @type {State}*/ ({}),
  [
    dispatch => {
      dispatch(settings.Init)
      dispatch(scoring.Init)
      dispatch(startPage.Init)
    },
    null,
  ],
]

/** @type {Action<State, any>}*/
const NextProblem = state => [
  problemPage.Init,
  scoring.getProblem(state, settings.getMax(state)),
]

/** @type {Action<State, State['scoring']>} */
const SetScoreData = (state, scoring) => ({ ...state, scoring })

/** @param {State} state*/
const view = state => {
  let page = state.pageName
  return page === "problem"
    ? problemPage.view(state)
    : page === "correct"
    ? correctPage.view(state)
    : page === "incorrect"
    ? incorrectPage.view(state)
    : startPage.view(state)
}

/** @type {Subs<State>}*/
const subs = state => {
  let page = state.pageName
  return [
    state?.scoring && [
      persistence,
      {
        key: "arithmentist-score",
        data: state.scoring,
        SetData: SetScoreData,
      },
    ],
    ...(page === "problem"
      ? problemPage.subs(state)
      : page === "correct"
      ? correctPage.subs(state)
      : page === "incorrect"
      ? incorrectPage.subs(state)
      : startPage.subs(state)),
  ]
}

const node = document.getElementById("app")
if (!node) throw new Error("no mount point for app")
app({
  init: Init,
  view: view,
  subscriptions: subs,
  node,
})
