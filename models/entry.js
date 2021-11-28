/** @typedef {string} State */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, string | undefined>} Init
 * @prop {Action<S, string>} Digit
 * @prop {Action<S, any>} Back
 * @prop {Getter<S, number>} getValue
 * @prop {Getter<S, string>} getEntry
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @returns {Model<S>}
 */
export default ({ get, set }) => {
  /** @type {Action<S, string | undefined>} */
  const Init = (state, entry = "") => set(state, entry)
  /** @type {Action<S, string>} */
  const Digit = (state, digit) => set(state, (get(state) + digit).substr(-3, 3))
  /** @type {Action<S, any>} */
  const Back = state => {
    let entry = get(state)
    return set(state, entry.substr(0, entry.length - 1))
  }

  /** @type {Getter<S, number>}*/
  const getValue = state => +get(state)

  /** @type {Getter<S, string>} */
  const getEntry = state => get(state)

  return { Init, Digit, Back, getValue, getEntry }
}
