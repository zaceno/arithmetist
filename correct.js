import { section, div } from "@hyperapp/html"
import keypad from "./views/keypad/keypad.js"
import badge from "./views/badge/badge.js"
import backButton from "./views/back-button/back-button.js"
import { Back, Check, Enter, BackToStart } from "./actions.js"

/**
 * @param {import('./actions.js').State} state
 */
export default state =>
  section({ class: "view view-correct" }, [
    backButton({ onclick: BackToStart, disabled: false }),
    div({ class: "successBadge" }, badge("correct")),
    keypad({ onBack: Back, onDone: Check, onEnterDigit: Enter }),
  ])
