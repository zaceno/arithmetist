import pageContainer from "@/views/page/page.js"
import gauge from "@/views/gauge/gauge.js"
import { backButton, nextButton } from "@/views/nav-buttons/nav-buttons.js"
import problem from "@/views/problem/problem.js"

/**
 * @template S
 * @param {object} props
 * @param {number} props.left
 * @param {number} props.right
 * @param {MaybeVNode<S>} props.correctBadge
 */
export default ({ left, right, correctBadge }) =>
  pageContainer({ classext: "correctpage" }, [
    gauge({ level: 0, full: 1 }),
    backButton({ disabled: true, action: x => x }),
    problem({
      left: left,
      right: right,
      answer: left * right,
    }),
    correctBadge,
    nextButton({ action: x => x }),
  ])
