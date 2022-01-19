import pageContainer from "@/views/page-container.js"
import gauge from "@/views/gauge.js"
import { backButton, nextButton } from "@/views/nav-buttons.js"
import problem from "@/views/problem.js"
import { incorrectBadge } from "@/views/badges.js"

/**
 * @typedef State
 * @prop {number} left
 * @prop {number} right
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {Action<S, any>} props.Continue
 * @param {Action<S, any>} props.Restart
 */
export default ({ get, set, Continue, Restart }) => {
  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) =>
    set(state, /** @type {State}*/ ({ left, right }))

  /** @param {S} state */
  const view = state => {
    const { left, right } = get(state)
    return pageContainer({ classext: "incorrectpage" }, [
      gauge({ level: 1, full: 1 }),
      backButton({ action: Restart }),
      problem({ left, right, answer: left * right }),
      incorrectBadge(),
      nextButton({ action: Continue }),
    ])
  }

  /** @type {Subs<S>}*/
  const subs = _ => []

  return { Init, view, subs }
}
