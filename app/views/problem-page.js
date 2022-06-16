import { page, problem, backButton } from "app/views/common.js"
import { gauge, keypad } from "lib/widgets/widgets.js"
/** @template S,X @typedef {import('hyperapp').Action<S,X>} Action */
/** @template S @typedef {import('lib/widgets/widgets.js').KeypadProps<S>} KeypadProps*/
/** @typedef {import('lib/timer.js').TimerStatus} TimerStatus*/

/**
 * @template S
 * @param {object} props
 * @param {number} props.left
 * @param {number} props.right
 * @param {string} props.entry
 * @param {TimerStatus} props.timer
 * @param {KeypadProps<S>} props.keypad
 * @param {Action<S, any> | [Action<S, any>, any]} props.Start
 */
export default ({ left, right, entry, timer, keypad: keypadModel, Start }) =>
  page({
    top: [
      backButton({ action: Start }),
      gauge({ full: timer.duration || 1, level: timer.ran }),
    ],
    main: [problem({ left, right, answer: entry })],
    bottom: keypad(keypadModel),
  })
