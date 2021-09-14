import { app } from "hyperapp"
import debuglog from "./lib/debuglog.js"
import persistence from "./lib/persistence.js"
import { main, button, text, section, p, div } from "./lib/html.js"
import keypad from "./views/keypad/keypad.js"
import badge from "./views/badge/badge.js"
import problem from "./views/problem.js"
/**
 * @template X
 * @typedef {import('hyperapp').Action<State, X>} Action
 */

/**
 * @typedef State
 * @prop {'initial' | 'problem' | 'answer'} mode
 * @prop {number} left
 * @prop {number} right
 * @prop {string} answer
 */

/** @type {Action<any>} */
const Start = state => [
  state,
  [
    dispatch => {
      let left = Math.floor(Math.random() * 9) + 1
      let right = Math.floor(Math.random() * 9) + 1
      dispatch(ShowProblem, { left, right })
    },
    null,
  ],
]

/** @type {Action<{left: number, right: number}>}*/
const ShowProblem = (state, { left, right }) => ({
  ...state,
  answer: "",
  left,
  right,
  mode: "problem",
})

/** @type {Action<number>} */
const Enter = (state, x) => {
  return {
    ...state,
    answer: (state.answer + x).substr(-3, 3),
  }
}

/** @type {Action<any>} */
const Back = state => {
  return {
    ...state,
    answer: state.answer.substr(0, state.answer.length - 1),
  }
}

/** @type {Action<any>} */
const Check = state => ({
  ...state,
  mode: "answer",
})

/** @param {State} state */
const initialView = state =>
  section(
    { class: "view view-initial" },
    button({ onclick: Start }, text("start"))
  )

/** @param {State} state */
const problemView = state =>
  section({ class: "view view-problem" }, [
    problem({ left: state.left, right: state.right, answer: state.answer }),
    keypad({ onBack: Back, onDone: Check, onEnterDigit: Enter }),
  ])

/** @param {State} state */
const answerView = state => {
  return section({ class: "view view-answer" }, [
    problem({ left: state.left, right: state.right }),
    badge(
      state.answer === "" + state.left * state.right ? "correct" : "incorrect"
    ),
    button({ class: "button-next", onclick: Start }, text("\u27A9")),
  ])
}

app({
  node: /** @type {HTMLElement}*/ (document.getElementById("app")),
  init: { left: 0, right: 0, answer: "", mode: "initial" },
  view: (/**@type {State} */ state) =>
    main(
      state.mode === "problem"
        ? problemView(state)
        : state.mode === "answer"
        ? answerView(state)
        : initialView(state)
    ),
  dispatch: d => persistence(debuglog(d)),
})
