import * as Timer from "lib/timer.js"
import { page, problem, backButton } from "app/views.js"
import { gauge, keypad } from "lib/widgets/widgets.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */

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
 * @param {import('app/settings.js').Model<S>} props.settings
 * @param {Action<S, {left: number, right: number, answer: number}>} props.Check
 * @param {Action<S, any>} props.Start
 */
export default ({ get, set, settings, Check, Start }) => {
  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) => [
    set(state, /** @type {State}*/ ({ left, right, entry: "" })),
    !settings.getPracticeMode(state) && (d => d(timer.Start, 7000)),
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

  const timer = Timer.wire({
    get: state => get(state).timer,
    set: (state, timer) => set(state, { ...get(state), timer }),
    OnTimeout: Done,
  })

  /** @param {S} state */
  const subs = state => timer.subs(state)

  /** @param {S} state */
  const view = state => {
    let tstat = timer.status(state)
    let { left, right, entry } = get(state)
    return page({
      top: [
        backButton({ action: Start }),
        gauge({ full: tstat.duration || 1, level: tstat.ran }),
      ],
      main: [problem({ left, right, answer: entry })],
      bottom: keypad({
        OnBack: Backspace,
        OnDigit: AddDigit,
        OnEnter: Done,
      }),
    })
  }

  return { Init, view, subs }
}
