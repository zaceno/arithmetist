import _view from "@/views/correct-page.js"
import CorrectBadge from "./correct-badge.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./models/correct-page.js').Model<S>} props.page
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
