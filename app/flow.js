import StartPage from "app/pages/start.js"
import ProblemPage from "app/pages/problem.js"
import CorrectPage from "app/pages/correct.js"
import IncorrectPage from "app/pages/incorrect.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/**
 * @typedef PageStateMap
 * @prop {import("app/pages/start.js").State} start
 * @prop {import("app/pages/problem.js").State} problem
 * @prop {import("app/pages/correct.js").State} correct
 * @prop {import("app/pages/incorrect.js").State} incorrect
 */
/** @typedef {keyof PageStateMap} PageName */
/** @template {PageName} N @typedef {PageStateMap[N]} PageState*/
/**
 * @template {PageName} N
 * @typedef StateForPage
 * @prop {N} pageName
 * @prop {PageStateMap[N]} pageState
 */
/** @template {PageName} N @typedef {N extends any ? StateForPage<N>: never} _StateMap */
/** @typedef {_StateMap<PageName>} State */

/**
 * @template S
 * @typedef FlowProps
 * @prop {(s:S) => State} get
 * @prop {(s:S, x:State) => S} set
 * @prop {import('app/settings.js').Model<S>} settings
 * @prop {import('app/scoring.js').Model<S>} scoring
 */
/**
 * @template S
 * @param {FlowProps<S>} props
 */
export default ({ get, set, settings, scoring }) => {
  /** @type {Action<S, any>}*/
  const Init = state => [
    set(state, /** @type {State}*/ ({})),
    d => d(pages.start.Init),
  ]

  /** @type {Action<S, {left: number, right: number, answer: number}>}*/
  const Check = (state, { left, right, answer }) => {
    const correct = left * right === answer
    const result = correct ? pages.correct : pages.incorrect
    return [
      state,
      d => d(result.Init, { left, right }),
      !settings.getPracticeMode(state) &&
        (d => d(scoring.Score, { left, right, correct })),
    ]
  }

  /**
   * @template {PageName} N
   * @param {N} pageName
   */
  const pageProps = pageName => ({
    get: (/** @type {S}*/ state) =>
      /** @type {PageState<N>}*/ (get(state).pageState),
    set: (/** @type {S}*/ state, /**@type {PageState<N>}*/ pageState) =>
      set(state, /** @type {State}*/ ({ pageState, pageName })),
    settings,
    scoring,
    Check,
    /** @type {Action<S, any>}*/
    Start: () => pages.start.Init,
    /** @type {Action<S, any>}*/
    Problem: state => [
      pages.problem.Init,
      scoring.getProblem(state, settings.getMaxTable(state)),
    ],
  })

  const pages = {
    start: StartPage(pageProps("start")),
    problem: ProblemPage(pageProps("problem")),
    correct: CorrectPage(pageProps("correct")),
    incorrect: IncorrectPage(pageProps("incorrect")),
  }

  /** @param {S} state*/
  const view = state => pages[get(state).pageName].view(state)

  /** @param {S} state*/
  const subs = state => {
    if (!state || !get(state) || !get(state).pageName) return []
    return pages[get(state).pageName].subs(state)
  }
  return { Init, view, subs }
}
