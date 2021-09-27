/** @typedef { import('./scoreboard.js').Scoreboard} Scoreboard*/
import { initScoreboard, getProblem, scoreProblem } from "./scoreboard.js"
import * as Timer from "./timer.js"
/** @typedef {import('./timer.js').TimerState} TimerState*/
const PROBLEM_DURATION = 9000

/**
 * @typedef State
 * @prop {'initial' | 'problem' | 'answer'} mode
 * @prop {Scoreboard} score
 * @prop {number} left
 * @prop {number} right
 * @prop {string} answer
 * @prop {number} max
 * @prop {TimerState} timer
 */

/** @returns {State} */
export const Init = () => ({
  score: initScoreboard(),
  left: 0,
  right: 0,
  answer: "",
  mode: "initial",
  max: 2,
  timer: Timer.initial,
})

/**
 * @template X
 * @typedef {import('hyperapp').Action<State, X>} Action
 */

/** @type {Action<any>} */
export const NextProblem = state => {
  let { left, right } = getProblem(state.score, state.max)
  return {
    ...state,
    left,
    right,
    answer: "",
    mode: "problem",
    timer: Timer.start(Date.now(), PROBLEM_DURATION),
  }
}

/** @type {Action<number>} */
export const TimerUpdate = (state, now) => {
  let timer = Timer.update(state.timer, now)
  if (state.mode === "problem" && Timer.timeUp(timer)) return Check
  return { ...state, timer }
}

/** @type {Action<number>} */
export const Enter = (state, x) => {
  return {
    ...state,
    answer: (state.answer + x).substr(-3, 3),
  }
}

/** @type {Action<any>} */
export const Back = state => {
  return {
    ...state,
    answer: state.answer.substr(0, state.answer.length - 1),
  }
}

/** @type {Action<any>} */
export const Check = state => {
  let { answer, left, right, score } = state
  let isCorrect = +answer === left * right
  score = scoreProblem(score, { left, right }, isCorrect)
  return { ...state, score, mode: "answer" }
}

/** @type {Action<any>} */
export const BackToStart = state => ({
  ...state,
  mode: "initial",
})

/** @type {Action<number>} */
export const SetMax = (state, max) => ({ ...state, max: Math.max(max, 2) })
