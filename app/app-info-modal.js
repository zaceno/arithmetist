import view from "@/views/modal/modal.js"
import AppInfo from "./app-info.js"
/**
 * @template S
 * @param {object} props
 * @param {import('@/models/modal.js').Model<S>} props.modal
 * @param {import('@/models/scoring.js').Model<S>} props.scoring
 * @returns {(state:S) => MaybeVNode<S>}
 */
export default ({ modal, scoring }) => {
  const appInfoView = AppInfo({ scoring })
  return state =>
    view({
      visible: modal.isVisible(state),
      animating: modal.isAnimating(state),
      OnTransitionEnd: modal.OnTransitionEnd,
      Hide: modal.Hide,
      render: () => appInfoView(state),
    })
}
