import view from "@/views/app-info.js"
/***/
/**
 * @template S
 * @param {object} props
 * @param {import('@/models/scoring.js').Model<S>} props.scoring
 * @returns {(state:S) => ElementVNode<S>[]}
 */
export default ({ scoring }) =>
  state =>
    view({ ResetScore: scoring.Init })
