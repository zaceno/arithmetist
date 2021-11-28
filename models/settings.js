/**
 * @typedef State
 * @prop {number} max
 * @prop {boolean} practice
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {Action<S, any>} TogglePractice
 * @prop {Action<S, number>} SetMax
 * @prop {(s:S) => boolean} useTimer
 * @prop {(s:S) => boolean} isPracticeMode
 * @prop {(s:S) => number} getMax
 * @prop {(s:S) => boolean} keepScore
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @returns {Model<S>}
 */
export default ({ get, set }) => {
  /** @type {Action<S, any>}*/
  const Init = global => set(global, { max: 3, practice: false })

  /** @type {Action<S, any>} */
  const TogglePractice = global => {
    let state = { ...get(global) }
    state.practice = !state.practice
    return set(global, state)
  }

  /** @type {Action<S, number>}*/
  const SetMax = (global, max) =>
    set(global, { ...get(global), max: Math.max(max, 3) })

  /** @type {Getter<S, boolean>} */
  const useTimer = state => !get(state).practice

  /** @type {Getter<S, boolean>} */
  const isPracticeMode = state => get(state).practice

  /** @type {Getter<S, boolean>} */
  const keepScore = state => !get(state).practice

  /** @type {Getter<S, number>} */
  const getMax = state => get(state).max

  return {
    Init,
    TogglePractice,
    SetMax,
    useTimer,
    isPracticeMode,
    keepScore,
    getMax,
  }
}
