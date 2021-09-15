import { section } from "./lib/html.js"
import problem from "./views/problem.js"
import keypad from "./views/keypad/keypad.js"
import backButton from "./views/back-button/back-button.js"
import { Back, Check, Enter, BackToStart } from "./actions.js"

/** @param {import('./actions.js').State} state */
export default state =>
  section({ class: "view view-problem" }, [
    backButton({ onclick: BackToStart }),
    problem({ left: state.left, right: state.right, answer: state.answer }),
    keypad({ onBack: Back, onDone: Check, onEnterDigit: Enter }),
  ])
