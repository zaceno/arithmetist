import { correctBadge } from "@/lib/views/badges.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./pop-out-transition/exit-transition-model.js').Model<S>} props.model
 * @returns {(state:S) => MaybeVNode<S>}
 */
export default ({ model }) =>
  state => {
    if (!model.isVisible(state)) return false
    const vnode = correctBadge()
    //@ts-ignore
    vnode.props.class = [
      vnode.props.class,
      { "pop-out": true, "pop-out-run": model.isHiding(state) },
    ]
    if (model.isHiding(state))
      //@ts-ignore
      vnode.props.ontransitionend = model.OnTransitionEnd
    return vnode
  }
