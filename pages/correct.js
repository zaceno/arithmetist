import wireExiter from "../models/exit-transition.js"
import pageContainer from "../views/page/page.js"
import gauge from "../views/gauge/gauge.js"
import { correctBadge } from "../views/badges/badges.js"
import { backButton, nextButton } from "../views/nav-buttons/nav-buttons.js"
import problem from "../views/problem/problem.js"

/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 * @prop {import('../models/exit-transition.js').State} exiter
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, {left:number, right:number}>} Init
 * @prop {(state:S) => ElementVNode<S>} view
 * @prop {(state:S) => (false | Subscription<S, any>)[]} subs
 */

/**
 * @template S,X, Y
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {ActionLike<S, any, X>} props.Next
 * @param {ActionLike<S, any, Y>} props.Back
 * @returns {Model<S>}
 */
export default ({ get, set, Next, Back }) => {
  const exiter = wireExiter({
    get: state => get(state).exiter,
    set: (state, exiter) => set(state, { ...get(state), exiter }),
    onDone: Next,
  })

  /** @type {Action<S, {left:number, right:number}>}*/
  const Init = (state, { left, right }) => [
    set(state, /** @type {State}*/ ({ left, right })),
    [
      dispatch => {
        dispatch(exiter.Init)
        requestAnimationFrame(() => {
          dispatch(exiter.Start)
        })
      },
      null,
    ],
  ]

  /** @param {S} state */
  const view = state => {
    let page = get(state)
    return pageContainer({ classext: "correctpage" }, [
      gauge({ level: 0, full: 1 }),
      backButton({ disabled: true, action: Back }),
      problem({
        left: page.left,
        right: page.right,
        answer: page.left * page.right,
      }),
      exiter.apply(state, "pop-out", correctBadge()),
      nextButton({ action: Next }),
    ])
  }

  /** @param {S} _ */
  const subs = _ => []

  return { Init, view, subs }
}
