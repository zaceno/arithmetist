import keypadView from "@/views/keypad.js"

/** @typedef {string} State */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 * @prop {Action<S, number>} OnSubmit
 */

/**
 * @template S
 * @param {Props<S>} props
 */
export default ({ get, set, OnSubmit }) => {
  /** @type {Action<S, string | undefined>} */
  const Init = (state, entry = "") => set(state, entry)

  /** @type {Action<S, string>} */
  const Digit = (state, digit) => set(state, (get(state) + digit).slice(-3))

  /** @type {Action<S, any>} */
  const Back = state => {
    let entry = get(state)
    return set(state, entry.slice(0, -1))
  }

  /** @param {S} state */
  const entry = state => get(state)

  /** @param {S} state */
  const view = state =>
    keypadView({
      OnDigit: Digit,
      OnBack: Back,
      OnEnter: state => [OnSubmit, get(state)],
    })

  return { Init, view, entry }
}
