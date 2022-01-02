import pageContainer from "@/views/page/page.js"
import { backButton } from "@/views/nav-buttons/nav-buttons.js"
import problem from "@/views/problem/problem.js"

/**
 * @template S
 * @param {object} props
 * @param {number} props.left
 * @param {number} props.right
 * @param {string} props.entry
 * @param {MaybeVNode<S>} props.timer
 * @param {MaybeVNode<S>} props.keypad
 * @param {Action<S, any>} props.Back
 */
export default ({ timer, keypad, left, right, entry, Back }) =>
  pageContainer({ classext: "problempage" }, [
    timer,
    backButton({ action: Back }),
    problem({
      left: left,
      right: right,
      answer: entry,
    }),
    keypad,
  ])
