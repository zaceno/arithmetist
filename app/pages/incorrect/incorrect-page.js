import _view from "./incorrect-page-view.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./incorrect-page-model.js').Model<S>} props.page
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
