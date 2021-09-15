import { section } from "./lib/html.js"
import problem from "./views/problem.js"
import keypad from "./views/keypad/keypad.js"
import { Back, Check, Enter } from "./actions.js"

/** @param {import('./actions.js').State} state */
export default state =>
  section({ class: "view view-problem" }, [
    problem({ left: state.left, right: state.right, answer: state.answer }),
    keypad({ onBack: Back, onDone: Check, onEnterDigit: Enter }),
  ])
