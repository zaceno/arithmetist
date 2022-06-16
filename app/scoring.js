/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S, X @typedef {import('hyperapp').Subscription<S, X>} Subscription */
/** @template S @typedef {(s:S) => (Subscription<S, any> | boolean | undefined  )[]} Subs */

/**
 * @typedef NumberCounter
 * @prop {number} number
 * @prop {number} wins
 * @prop {number} seen
 */

/** @typedef {NumberCounter[]} State */

/**
 * @param {State} scoreboard
 * @param {number} number
 * @param {boolean} correct
 * @returns {State}
 */
const scoreNumber = (scoreboard, number, correct) => {
  let counter = scoreboard.find(c => c.number === number)
  if (!counter) return scoreboard
  return [
    ...scoreboard.filter(c => c.number !== number),
    {
      number,
      seen: counter.seen + 1,
      wins: counter.wins + (correct ? 1 : 0),
    },
  ]
}

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
 * @param {NumberCounter} counter
 * @returns {number}
 */
const getRatio = ({ wins, seen }) =>
  seen === 0 ? 0 : wins / Math.max(seen, 20)

/**
 * @param {NumberCounter} counter
 * @returns {number}
 */
const getNumberScore = counter => counter.number * getRatio(counter)

/**
 * @param {State} scoreboard
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
 * @template S
 * @param {object} props
 * @param {(s:S) => State} props.get
 * @param {(s:S, x:State) => S} props.set
 */
export default ({ set, get }) => {
  /** @type {Action<S,void>} */
  const Init = state =>
    set(
      state,
      [...Array(11).keys()].map(x => ({
        number: x + 2,
        wins: 0,
        seen: 0,
      }))
    )

  /** @type {Action<S,{correct: boolean, left:number, right:number}>}*/
  const Score = (state, { left, right, correct }) => {
    let scoreboard = get(state)
    scoreboard = scoreNumber(scoreboard, left, correct)
    scoreboard = scoreNumber(scoreboard, right, correct)
    return set(state, scoreboard)
  }
  /**
   * @param {S} state
   * @param {number} max
   * @returns {{left:number, right:number}}
   */
  const getProblem = (state, max) => {
    const scoreboard = get(state)
    return {
      left: getNumber(scoreboard, max),
      right: getNumber(scoreboard, max),
    }
  }
  /**
   * @param {S} state
   * @returns {{number:number, ratio:number}[]}
   */
  const getRatios = state =>
    get(state)
      .sort((l, r) => l.number - r.number)
      .map(x => ({ number: x.number, ratio: getRatio(x) }))

  /**
   * @param {S} state
   * @returns {number}
   */
  const getScore = state => Math.round(10 * sum(get(state).map(getNumberScore)))

  return { Init, Score, getProblem, getRatios, getScore }
}
