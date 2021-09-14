import { app } from "hyperapp"
import { main, button, text, section, p } from "./lib/html.js"
import keypad from "./views/keypad/keypad.js"
import debuglog from "./lib/debuglog.js"
import persistence from "./lib/persistence.js"

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
const initial = state => button({ onclick: Start }, text("start"))

/** @param {State} state */
const problem = state =>
  section([
    p(
      { class: "problem" },
      text(`${state.left} \u00D7 ${state.right} = ${state.answer}`)
    ),
    keypad({ onBack: Back, onDone: Check, onEnterDigit: Enter }),
  ])

/** @param {State} state */
const answer = state => {
  let correctAnswer = state.left * state.right
  let answeredCorrectly = correctAnswer === +state.answer
  return section([
    p(
      { class: { problem: true, correct: answeredCorrectly } },
      text(`${state.left} \u00D7 ${state.right} = ${correctAnswer}`)
    ),
    p(text(answeredCorrectly ? "Rätt!" : "Försök igen!")),
    button({ class: "button-next", onclick: Start }, text("Nästa >")),
  ])
}

app({
  node: /** @type {HTMLElement}*/ (document.getElementById("app")),
  init: { left: 0, right: 0, answer: "", mode: "initial" },
  view: (/**@type {State} */ state) =>
    main(
      state.mode === "problem"
        ? problem(state)
        : state.mode === "answer"
        ? answer(state)
        : initial(state)
    ),
  dispatch: d => persistence(debuglog(d)),
})
