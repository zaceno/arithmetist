import view from "./app-info-view.js"
/***/
/**
 * @template S
 * @param {object} props
 * @param {import('@/scoring-model.js').Model<S>} props.scoring
 * @returns {(state:S) => ElementVNode<S>[]}
 */
export default ({ scoring }) =>
  state =>
    view({ ResetScore: scoring.Init })
