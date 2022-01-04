import Timer from "./timer.js"
import Keypad from "./keypad.js"
import pageContainer from "@/views/page-container.js"
import { backButton } from "@/views/nav-buttons.js"
import problem from "@/views/problem.js"

/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 * @prop {import('./timer.js').State} timer
 * @prop {import('./keypad.js').State} keypad
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {import('./settings-model.js').Model<S>} props.settings
 * @param {Action<S, {left:number, right:number, answer: number}>} props.Check
 * @param {Action<S, any>} props.Restart
 */
export default ({ get, set, settings, Check: _Check, Restart }) => {
  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) => [
    set(state, /** @type {State}*/ ({ left, right })),
    [
      dispatch => {
        dispatch(keypad.Init, "")
        dispatch(timer.Reset, settings.useTimer(state) ? 7000 : 0)
        dispatch(timer.Start, performance.now())
      },
      null,
    ],
  ]

  /** @type {Action<S, any>}*/
  const Check = state => [
    _Check,
    { ...getProblem(state), answer: +keypad.entry(state) },
  ]

  const timer = Timer({
    get: state => get(state).timer,
    set: (state, timer) => set(state, { ...get(state), timer }),
    onStart: x => x,
    onTimeout: Check,
  })

  const keypad = Keypad({
    get: state => get(state).keypad,
    set: (state, keypad) => set(state, { ...get(state), keypad }),
    OnSubmit: Check,
  })

  /** @param {S} state */
  const getProblem = state => {
    const { left, right } = get(state)
    return { left, right }
  }

  /** @param {S} state */
  const view = state =>
    pageContainer({ classext: "problempage" }, [
      timer.view(state),
      backButton({ action: Restart }),
      problem({
        ...getProblem(state),
        answer: keypad.entry(state),
      }),
      keypad.view(state),
    ])

  const subs = timer.subs

  return { Init, view, subs }
}
