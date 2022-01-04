import nextFrame from "@/lib/io/next-frame.js"
/*

state: 0 hidden completely, 1 will appear, 2appearing, 3, showing, 4 hiding

*/

/** @typedef {0 | 1 | 2 | 3 | 4 } State */

/**
 * @template S
 * @template [X=any]
 * @template [Y=any]
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {Action<S, any> | [Action<S, X>, X]} [props.OnDoneShowing]
 * @param {Action<S, any> | [Action<S, Y>, Y]} [props.OnDoneHiding]
 */
export default ({ get, set, OnDoneShowing, OnDoneHiding }) => {
  /** @type {Action<S, boolean | undefined>}*/
  const Init = (state, showing = false) => set(state, showing ? 3 : 0)

  /** @type {Action<S, any>}*/
  const Show = state => {
    const mode = get(state)
    if (mode !== 0) return state
    return [set(state, 1), nextFrame(state => set(state, 2))]
  }

  /** @type {Action<S, any>} */
  const Hide = state => (get(state) !== 3 ? state : set(state, 4))

  /** @type {Action<S, any>}*/
  const DoneHiding = state => [
    set(state, 0),
    OnDoneHiding && [
      dispatch => {
        dispatch(OnDoneHiding)
      },
      null,
    ],
  ]

  /** @type {Action<S, any>}*/
  const DoneShowing = state => [
    set(state, 3),
    OnDoneShowing && [
      dispatch => {
        dispatch(OnDoneShowing)
      },
      null,
    ],
  ]

  /** @type {Action<S, any>}*/
  const OnTransitionEnd = state => {
    const mode = get(state)
    return mode === 2 ? DoneShowing : mode === 4 ? DoneHiding : state
  }

  /**
   * @param {S} state
   * @param {(props:{hiding:boolean, showing:boolean}) => MaybeVNode<S>} render
   */
  const apply = (state, render) => {
    const mode = get(state)
    if (mode === 0) return false
    const vnode = render({
      hiding: mode === 4,
      showing: mode === 1,
    })
    if (!vnode || vnode === true) return vnode
    //@ts-ignore
    vnode.props.ontransitionend = OnTransitionEnd
    return vnode
  }

  return { Init, Show, Hide, apply }
}
