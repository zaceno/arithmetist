/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 * @prop {Action<S, any>} Continue
 * @prop {Action<S, any>} Restart
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, {left: number, right: number}>} Init
 * @prop {(state:S) => {left: number, right: number}} getProblem
 * @prop {Action<S, any>} Restart
 * @prop {Action<S, any>} Continue
 * @prop {Action<S, any>} Restart
 */

/**
 * @template S
 * @param {Props<S>} props
 * @returns {Model<S>}
 */
export default ({ get, set, Continue, Restart }) => {
  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) =>
    set(state, /** @type {State}*/ ({ left, right }))

  /** @param {S} state */
  const getProblem = state => {
    let { left, right } = get(state)
    return { left, right }
  }

  return { Init, getProblem, Continue, Restart }
}
