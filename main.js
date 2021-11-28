import { app } from "hyperapp"
import wireScoring from "./models/scoring.js"
import wireSettings from "./models/settings.js"
import wireIncorrectPage from "./pages/incorrect.js"
import wireCorrectPage from "./pages/correct.js"
import wireProblemPage from "./pages/problem.js"
import wireStartPage from "./pages/start.js"
import persistence from "./io/persistence.js"

/** @typedef {import("./pages/incorrect.js").State} IncorrectPageState */
/** @typedef {import("./pages/correct.js").State} CorrectPageState */
/** @typedef {import("./pages/problem.js").State} ProblemPageState */
/** @typedef {import("./pages/start.js").State} StartPageState */
/** @typedef {import("./pages/incorrect.js").Model<State>} IncorrectPage */
/** @typedef {import("./pages/correct.js").Model<State>} CorrectPage */
/** @typedef {import("./pages/problem.js").Model<State>} ProblemPage */
/** @typedef {import("./pages/start.js").Model<State>} StartPage */
/** @typedef {import("./models/scoring.js").Model<State>} ScoringModel */
/** @typedef {import("./models/settings.js").Model<State>} SettingsModel */

/**
 * @typedef {
    { 
      scoring: import("./models/scoring.js").State,
      settings: import("./models/settings.js").State
    } & (
      {pageName: 'start',   pageState: StartPageState} | 
      {pageName: 'problem',   pageState: ProblemPageState} | 
      {pageName: 'correct',   pageState: CorrectPageState} | 
      {pageName: 'incorrect', pageState: IncorrectPageState} |
      {pageName: 'start', pageState: null}      
    )
  } State
 */

/** @type {Action<State, void>}*/
const Init = state => [
  /** @type {State}*/ ({}),
  [
    dispatch => {
      dispatch(scoring.Init)
      dispatch(settings.Init)
      dispatch(startPage.Init)
    },
    null,
  ],
]

/** @type {ScoringModel} */
const scoring = wireScoring({
  get: state => state.scoring,
  set: (state, scoring) => ({ ...state, scoring }),
})

/** @type {SettingsModel} */
const settings = wireSettings({
  get: state => state.settings,
  set: (state, settings) => ({ ...state, settings }),
})

/** @type {ProblemPage} */
const problemPage = wireProblemPage({
  get: state => /** @type {ProblemPageState}*/ (state.pageState),
  set: (state, pageState) => ({
    ...state,
    pageState,
    pageName: "problem",
  }),
  scoring,
  settings,
  Back: () => startPage.Init,
  OnIncorrect: (_, problem) => [incorrectPage.Init, problem],
  OnCorrect: (_, problem) => [correctPage.Init, problem],
})

/** @type {StartPage} */
const startPage = wireStartPage({
  get: state => /** @type {StartPageState} */ (state.pageState),
  set: (state, pageState) => ({ ...state, pageState, pageName: "start" }),
  settings,
  scoring,
  Start: problemPage.Init,
})

/** @type {CorrectPage} */
const correctPage = wireCorrectPage({
  get: state => /** @type {CorrectPageState}*/ (state.pageState),
  set: (state, pageState) => ({
    ...state,
    pageState,
    pageName: "correct",
  }),
  Next: problemPage.Init,
  Back: startPage.Init,
})

/** @type {IncorrectPage} */
const incorrectPage = wireIncorrectPage({
  get: state => /** @type {IncorrectPageState} */ (state.pageState),
  set: (state, pageState) => ({
    ...state,
    pageState,
    pageName: "incorrect",
  }),
  Next: problemPage.Init,
  Back: startPage.Init,
})

const node = document.getElementById("app")
if (!node) throw new Error("can't start app – mountpoint missing")
app({
  node,
  init: Init,
  view: state =>
    state.pageName === "correct"
      ? correctPage.view(state)
      : state.pageName === "incorrect"
      ? incorrectPage.view(state)
      : state.pageName === "problem"
      ? problemPage.view(state)
      : startPage.view(state),
  subscriptions: state => [
    [persistence, state],
    ...(state.pageName === "correct"
      ? correctPage.subs(state)
      : state.pageName === "incorrect"
      ? incorrectPage.subs(state)
      : state.pageName === "problem"
      ? problemPage.subs(state)
      : []),
  ],
})
