/**
 * @typedef Problem
 * @prop {number} left
 * @prop {number} right
 */

/**
 * @typedef NumberCounter
 * @prop {number} number
 * @prop {number} wins
 * @prop {number} seen
 */

/** @typedef {NumberCounter[]} Scoreboard */

/**
 * @param {number} number
 * @returns {NumberCounter}
 */
const initNumberCounter = number => ({
  number,
  wins: 0,
  seen: 0,
})

/** @returns {Scoreboard} */
export const initScoreboard = () =>
  [...Array(12).keys()].map(x => initNumberCounter(x + 1))

/**
 * @param {Scoreboard} scoreboard
 * @param {Problem} problem
 * @param {boolean} success
 * @returns {Scoreboard}
 */
export const scoreProblem = (scoreboard, problem, success) => {
  let { left, right } = problem
  scoreboard = scoreNumber(scoreboard, left, success)
  scoreboard = scoreNumber(scoreboard, right, success)
  return scoreboard
}

/**
 * @param {Scoreboard} scoreboard
 * @param {number} number
 * @param {boolean} success
 * @returns {Scoreboard}
 */
const scoreNumber = (scoreboard, number, success) => {
  let counter = scoreboard.find(c => c.number === number)
  if (!counter) return scoreboard
  return [
    ...scoreboard.filter(c => c.number !== number),
    scoreCount(counter, success),
  ]
}

/**
 * @param {NumberCounter} counter | undefined
 * @param {boolean} success
 * @returns {NumberCounter}
 */
const scoreCount = (counter, success) => ({
  ...counter,
  seen: counter.seen + 1,
  wins: counter.wins + (success ? 1 : 0),
})

/**
 * @param {number[]} orig
 * @returns {number[]}
 */
const cumulative = orig =>
  orig.reduce(
    (arr, x) => (arr.length ? [...arr, arr[arr.length - 1] + x] : [x]),
    /** @type {number[]}*/ ([])
  )

/**
 * @param {number[]} nums
 * @returns {number}
 */
const sum = nums => nums.reduce((tot, x) => tot + x, 0)

/**
 * @param {Scoreboard} scoreboard
 * @param {number} max
 * @returns {number}
 */
const getNumber = (scoreboard, max) => {
  let options = scoreboard.filter(c => c.number <= max)
  let probs = options.map(c => 1.01 - getRatio(c))
  let rando = Math.random() * sum(probs)
  let fltrd = cumulative(probs).filter(p => p < rando)
  return options[fltrd.length].number
}

/**
 * @param {Scoreboard} scoreboard
 * @param {number} max
 * @returns {Problem}
 */
export const getProblem = (scoreboard, max) => ({
  left: getNumber(scoreboard, max),
  right: getNumber(scoreboard, max),
})

/**
 * @param {NumberCounter} counter
 * @returns {number}
 */
const getRatio = ({ wins, seen }) =>
  seen === 0 ? 0 : wins / Math.max(seen, 20)

/**
 * @param {Scoreboard} scoreboard
 * @returns number[]
 */
export const getRatios = scoreboard =>
  scoreboard.sort((l, r) => l.number - r.number).map(getRatio)

/**
 * @param {NumberCounter} counter
 * @returns {number}
 */
const getNumberScore = counter => counter.number * getRatio(counter)

/**
 * @param {Scoreboard} scoreboard
 * @returns {number}
 */
export const getScore = scoreboard =>
  Math.round(10 * sum(scoreboard.map(getNumberScore)))
