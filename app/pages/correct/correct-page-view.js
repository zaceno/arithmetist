import pageContainer from "../../page-container/page-container-view.js"
import gauge from "../problem-page/timer/gauge.js"
import { backButton, nextButton } from "../../nav-buttons/nav-buttons.js"
import problem from "../../problem-component/problem-view.js"

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
