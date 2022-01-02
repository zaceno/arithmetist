import _view from "./correct-page-view.js"
import CorrectBadge from "./popping-badge/correct-badge.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./correct-page-model.js').Model<S>} props.page
 */
export default ({ page }) => {
  const correctBadge = CorrectBadge({ model: page.exiter })

  /** @param {S} state */
  const view = state =>
    _view({
      ...page.getProblem(state),
      correctBadge: correctBadge(state),
    })

  /** @param {any} _*/
  const subs = _ => []

  return { view, subs }
}
