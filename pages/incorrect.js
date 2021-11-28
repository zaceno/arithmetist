import pageContainer from "../views/page/page.js"
import gauge from "../views/gauge/gauge.js"
import { incorrectBadge } from "../views/badges/badges.js"
import problem from "../views/problem/problem.js"
import { backButton, nextButton } from "../views/nav-buttons/nav-buttons.js"

/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, {left:number, right:number}>} Init
 * @prop {(state:S) => ElementVNode<S>} view
 * @prop {(state:S) => (false | Subscription<S, any>)[]} subs
 */

/**
 * @template S,X,Y
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {ActionLike<S, any, X>} props.Next
 * @param {ActionLike<S, any, Y>} props.Back
 * @returns {Model<S>}
 */
export default ({ get, set, Next, Back }) => {
  /** @type {Action<S, {left:number, right:number}>}*/
  const Init = set

  /** @param {S} _ */
  const subs = _ => []

  /** @param {S} state */
  const view = state => {
    const { left, right } = get(state)
    return pageContainer({ classext: "incorrectpage" }, [
      gauge({ level: 1, full: 1 }),
      backButton({ action: Back }),
      problem({ left, right, answer: left * right }),
      incorrectBadge(),
      nextButton({ action: Next }),
    ])
  }
  return { Init, view, subs }
}
