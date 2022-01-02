import Entry from "./keypad/entry-model.js"
import Timer from "./timer/timer-model.js"

/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 * @prop {import('./timer/timer-model.js').State} timer
 * @prop {import('./keypad/entry-model.js').State} entry
 */

/**
 * @template S
 * @typedef Model
 * @prop {import('./timer/timer-model.js').Model<S>} timer
 * @prop {import('./keypad/entry-model.js').Model<S>} entry
 * @prop {Action<S, any>} Init
 * @prop {Action<S, any>} Check
 * @prop {(state:S) => {left:number, right:number}} getProblem
 * @prop {Action<S, any>} Restart
 */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 * @prop {Getter<S, boolean>} useTimer
 * @prop {Action<S, {left:number, right:number, answer: number}>} Check
 * @prop {Action<S, any>} Restart
 */

/**
 * @template S
 * @param {Props<S>} props
 * @returns {Model<S>}
 */
export default ({ get, set, useTimer, Check: _Check, Restart }) => {
  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) => [
    set(state, /** @type {State}*/ ({ left, right })),
    [
      dispatch => {
        dispatch(entry.Init, "")
        dispatch(timer.Reset, useTimer(state) ? 7000 : 0)
        dispatch(timer.Start, performance.now())
      },
      null,
    ],
  ]

  /** @type {Action<S, any>}*/
  const Check = state => [
    _Check,
    { ...getProblem(state), answer: entry.getValue(state) },
  ]

  /** @param {S} state */
  const getProblem = state => {
    const { left, right } = get(state)
    return { left, right }
  }

  const entry = Entry({
    get: state => get(state).entry,
    set: (state, entry) => set(state, { ...get(state), entry }),
  })

  const timer = Timer({
    get: state => get(state).timer,
    set: (state, timer) => set(state, { ...get(state), timer }),
    onStart: x => x,
    onTimeout: Check,
  })

  return { Init, Check, entry, timer, getProblem, Restart }
}
