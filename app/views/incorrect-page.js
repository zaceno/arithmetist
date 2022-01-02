import pageContainer from "@/views/page/page.js"
import gauge from "@/views/gauge/gauge.js"
import { backButton, nextButton } from "@/views/nav-buttons/nav-buttons.js"
import problem from "@/views/problem/problem.js"
import { incorrectBadge } from "@/views/badges/badges.js"

/**
 * @template S
 * @param {object} props
 * @param {number} props.left
 * @param {number} props.right
 * @param {Action<S, any>} props.Back
 * @param {Action<S, any>} props.Continue
 */
export default ({ left, right, Back, Continue }) =>
  pageContainer({ classext: "incorrectpage" }, [
    gauge({ level: 1, full: 1 }),
    backButton({ action: Back }),
    problem({ left, right, answer: left * right }),
    incorrectBadge(),
    nextButton({ action: Continue }),
  ])
