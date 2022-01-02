import view from "./modal/modal-view.js"
import AppInfo from "./app-info/app-info.js"
/**
 * @template S
 * @param {object} props
 * @param {import('./modal/modal-model.js').Model<S>} props.modal
 * @param {import('@/scoring-model.js').Model<S>} props.scoring
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
