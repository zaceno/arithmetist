import _view from "@/views/incorrect-page.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./models/incorrect-page.js').Model<S>} props.page
 */
export default ({ page }) => {
  /** @param {S} state */
  const view = state =>
    _view({
      ...page.getProblem(state),
      Continue: page.Continue,
      Back: page.Restart,
    })

  /** @param {any} _*/
  const subs = _ => []

  return { view, subs }
}
