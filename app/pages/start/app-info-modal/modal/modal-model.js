import nextFrame from "@/lib/io/next-frame.js"

/**
 * @typedef State
 * @prop {boolean} container
 * @prop {boolean} overlay
 */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {Action<S, any>} Show
 * @prop {Action<S, any>} Hide
 * @prop {Action<S, any>} OnTransitionEnd
 * @prop {(state:S) => boolean} isVisible
 * @prop {(state:S) => boolean} isAnimating
 */

/**
 * @template S
 * @param {Props<S>} props
 * @returns {Model<S>}
 */
export default ({ get, set }) => {
  /** @type {Action<S, any>} */
  const Init = state => set(state, { overlay: false, container: false })

  /** @type {Action<S, any>} */
  const FinishShow = state => set(state, { overlay: true, container: true })

  /** @type {Action<S, any>} */
  const Show = state => [
    set(state, { overlay: true, container: false }),
    nextFrame(FinishShow),
  ]

  /** @type {Action<S, any>} */
  const Hide = state => set(state, { overlay: false, container: true })

  /** @type {Action<S, any>} */
  const OnTransitionEnd = state => {
    const { overlay, container } = get(state)
    if (!overlay && container)
      return set(state, { overlay: false, container: false })
    return state
  }

  /** @param {S} state */
  const isVisible = state => {
    const { overlay, container } = get(state)
    return overlay || container
  }

  /** @param {S} state */
  const isAnimating = state => {
    const { overlay, container } = get(state)
    return overlay !== container
  }

  return { Init, Show, Hide, OnTransitionEnd, isVisible, isAnimating }
}
