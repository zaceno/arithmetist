/**
 * @typedef {0 | 1 | 2 | 3}  State
 */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 * @prop {Action<S, any>} OnDone
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {Action<S, any>} Start
 * @prop {Action<S, any>} OnTransitionEnd
 * @prop {(s:S) => boolean} isVisible
 * @prop {(s:S) => boolean} isHiding
 */

/**
 * @template S
 * @param {Props<S>} props
 * @returns {Model<S>}
 */
export default ({ get, set, OnDone }) => {
  /** @type {Action<S, any>}*/
  const Start = state => (get(state) === 0 ? set(state, 1) : state)

  /** @type {Action<S, any>}*/
  const OnTransitionEnd = state =>
    get(state) === 1
      ? [
          set(state, 2),
          [
            disp => {
              disp(OnDone)
            },
            null,
          ],
        ]
      : state

  /** @type {Action<S, any>}*/
  const Init = state => set(state, 0)

  /** @param {S} state */
  const isVisible = state => get(state) < 2

  /** @param {S} state */
  const isHiding = state => get(state) === 1

  return { Init, Start, isVisible, isHiding, OnTransitionEnd }
}
