import pageContainer from "../../page-container/page-container-view.js"
import gauge from "../problem-page/timer/gauge.js"
import { backButton, nextButton } from "../../nav-buttons/nav-buttons.js"
import problem from "../../problem-component/problem-view.js"
import { incorrectBadge } from "@/lib/views/badges.js"

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
