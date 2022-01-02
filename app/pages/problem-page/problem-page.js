import Timer from "./timer/problem-timer.js"
import Keypad from "./keypad/keypad.js"
import problemPageView from "./problem-page-view.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./problem-page-model.js').Model<S>} props.page
 */
export default ({ page }) => {
  const keypadView = Keypad({ entry: page.entry, OnSubmit: page.Check })

  const timer = Timer({ timer: page.timer })

  /** @param {S} state */
  const view = state =>
    problemPageView({
      timer: timer.view(state),
      keypad: keypadView(state),
      ...page.getProblem(state),
      Back: page.Restart,
      entry: page.entry.getEntry(state),
    })

  /** @param {S} state */
  const subs = state => timer.subs(state)

  return { view, subs }
}
