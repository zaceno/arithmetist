import Exiter from "./exit-transition.js"
import nextFrame from "@/lib/io/next-frame.js"

/**
 * @typedef State
 * @prop {import('./exit-transition.js').State} exiter
 * @prop {number} left
 * @prop {number} right
 */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 * @prop {Action<S, any>} Continue
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, {left: number, right: number}>} Init
 * @prop {import('./exit-transition.js').Model<S>} exiter
 * @prop {(state:S) => {left: number, right: number}} getProblem
 */

/**
 * @template S
 * @param {Props<S>} props
 * @returns {Model<S>}
 */
export default ({ get, set, Continue, Restart }) => {
  const exiter = Exiter({
    get: state => get(state)?.exiter,
    set: (state, exiter) => set(state, { ...(get(state) || {}), exiter }),
    OnDone: Continue,
  })

  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) => [
    set(state, /** @type {State}*/ ({ left, right })),
    [
      dispatch => {
        dispatch(exiter.Init)
      },
      null,
    ],
    nextFrame(exiter.Start),
  ]

  /** @param {S} state */
  const getProblem = state => {
    let { left, right } = get(state)
    return { left, right }
  }

  return { Init, exiter, getProblem }
}
