/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S, X @typedef {import('hyperapp').Subscription<S, X>} Subscription */
/** @template S @typedef {(s:S) => (Subscription<S,any> | boolean | undefined  )[]} Subs */
import pageView from "app/views/problem-page.js"
import Timer from "lib/timer.js"

/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 * @prop {string} entry
 * @prop {import('lib/timer.js').State} timer
 */

/**
 * @template S
 * @param {object} props
 * @param {(s:S) => State } props.get
 * @param {(s:S, x:State) => S} props.set
 * @param {(s:S) => boolean} props.getPracticeMode
 * @param {Action<S, {left: number, right: number, answer: number}>} props.Check
 * @param {Action<S, any>} props.Start
 */
export default ({ get, set, getPracticeMode, Check, Start }) => {
  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) => [
    set(state, /** @type {State}*/ ({ left, right, entry: "" })),
    !getPracticeMode(state) && (d => d(timer.Start, 7000)),
  ]

  /** @type {Action<S, string>}*/
  const AddDigit = (state, digit) => {
    const local = get(state)
    const entry = (local.entry + digit).slice(-3)
    return set(state, { ...local, entry })
  }

  /** @type {Action<S, any>}*/
  const Backspace = state => {
    const local = get(state)
    const entry = local.entry.slice(0, -1)
    return set(state, { ...local, entry })
  }

  /** @type {Action<S, any>}*/
  const Done = state => {
    const { left, right, entry } = get(state)
    return [Check, { left, right, answer: +entry }]
  }

  const timer = Timer({
    get: state => get(state).timer,
    set: (state, timer) => set(state, { ...get(state), timer }),
    OnTimeout: Done,
  })

  /** @type {Subs<S>}*/
  const subs = state => [...timer.subs(state)]

  /** @param {S} state */
  const view = state => {
    const { left, right, entry } = get(state)
    return pageView({
      left,
      right,
      entry,
      timer: timer.status(state),
      keypad: {
        OnDigit: AddDigit,
        OnBack: Backspace,
        OnEnter: Done,
      },
      Start,
    })
  }

  return { Init, view, subs }
}
