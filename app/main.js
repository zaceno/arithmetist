import { app } from "hyperapp"
import persistence from "lib/io/persistence.js"
import StartPage from "app/start-page.js"
import ProblemPage from "app/problem-page.js"
import CorrectPage from "app/correct-page.js"
import IncorrectPage from "app/incorrect-page.js"
import Scoring from "app/scoring.js"
/** @template S @typedef {(s:S) => (Subscription<S,any> | boolean | undefined )[]} Subs */
/** @template S, X @typedef {import('hyperapp').Subscription<S, X>} Subscription */

/**
 * @typedef PageStateMap
 * @prop {import("app/start-page.js").State} start
 * @prop {import("app/problem-page.js").State} problem
 * @prop {import("app/correct-page.js").State} correct
 * @prop {import("app/incorrect-page.js").State} incorrect
 */
/** @typedef {keyof PageStateMap} PageName */
/** @template {PageName} N @typedef {PageStateMap[N]} PageState*/
/**
 * @template {PageName} N
 * @typedef State_Page
 * @prop {N} pageName
 * @prop {PageStateMap[N]} pageState
 */
/**
 * @typedef State_Common
 * @prop {number} maxTable,
 * @prop {boolean} practiceMode,
 * @prop {import('app/scoring.js').State} scoring,
 */
/** @template {PageName} N @typedef {State_Common & State_Page<N>} StateForPage */
/** @template {PageName} N @typedef {N extends any ? StateForPage<N> : never} StateVariants */
/** @typedef {StateVariants<PageName>} State */

/** @template [X=any] @typedef {import('hyperapp').Action<State, X>} Action */

/** @type {Action}*/
const Init = () => [
  /** @type {State}*/ ({
    maxTable: 3,
    practiceMode: false,
  }),
  d => d(scoring.Init),
  d => d(Start),
]

/** @type {Action}*/
const TogglePracticeMode = state => ({
  ...state,
  practiceMode: !state.practiceMode,
})

/** @type {Action<number>}*/
const SetMaxTable = (state, n) => ({ ...state, maxTable: Math.max(3, n) })

/** @type {Action}*/
const Start = () => startPage.Init

/** @type {Action<{left:number, right:number}>}*/
const Correct = (_, x) => [correctPage.Init, x]

/** @type {Action<{left: number, right: number}>}*/
const Incorrect = (_, x) => [incorrectPage.Init, x]

/** @type {Action}*/
const Problem = state => [
  problemPage.Init,
  scoring.getProblem(state, state.maxTable),
]

/** @type {Action<{left: number, right: number, answer: number}>}*/
const Check = (state, { left, right, answer }) => {
  const correct = left * right === answer
  const Action = correct ? Correct : Incorrect
  return [
    state,
    d => d(Action, { left, right }),
    !state.practiceMode && (d => d(scoring.Score, { left, right, correct })),
  ]
}

/** @type {Action<'start'>}*/
const ResetScore = () => scoring.Init

const scoring = Scoring({
  /** @param {State} state*/
  get: state => state.scoring,
  set: (state, scoring) => ({ ...state, scoring }),
})

/**
 * @template {PageName} N
 * @param {N} pageName
 */
const pageProps = pageName => ({
  get: (/** @type {State}*/ state) =>
    /** @type {PageState<N>}*/ (state.pageState),
  set: (/** @type {State}*/ state, /**@type {PageState<N>}*/ pageState) =>
    /** @type {State}*/ ({ ...state, pageState, pageName }),
  getScore: scoring.getScore,
  getRatios: scoring.getRatios,
  getMaxTable: (/** @type {State}*/ state) => state.maxTable,
  getPracticeMode: (/** @type {State}*/ state) => state.practiceMode,
  SetMaxTable,
  TogglePracticeMode,
  ResetScore,
  Start,
  Problem,
  Check,
  Correct,
  Incorrect,
})

const startPage = StartPage(pageProps("start"))
const problemPage = ProblemPage(pageProps("problem"))
const correctPage = CorrectPage(pageProps("correct"))
const incorrectPage = IncorrectPage(pageProps("incorrect"))

/** @param {State} state */
const currentPage = state => {
  const pageName = state.pageName
  return pageName === "problem"
    ? problemPage
    : pageName === "correct"
    ? correctPage
    : pageName === "incorrect"
    ? incorrectPage
    : startPage
}

/** @type {(s:State) => State_Common} */
const getPersistentData = state => ({
  scoring: state.scoring,
  practiceMode: state.practiceMode,
  maxTable: state.maxTable,
})

/** @type {Action<State_Common>}*/
const SetPersistentData = (state, data) => ({ ...state, ...data })

const node = document.getElementById("app")
if (!node) throw new Error("no mount point for app")
app({
  init: Init,
  view: state => currentPage(state).view(state),
  subscriptions: state => [
    persistence("state", getPersistentData(state), SetPersistentData),
    ...currentPage(state).subs(state),
  ],
  node,
})
