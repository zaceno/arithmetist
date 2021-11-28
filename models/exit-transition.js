/**
 * @typedef {0 | 1 | 2 | 3}  State
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {Action<S, any>} Start
 * @prop {(state:S, name:string, vnode: ElementVNode<S>) => ElementVNode<S> | false} apply
 */

/**
 * @template S,X
 * @param {object} props
 * @param {Getter<S,State>} props.get
 * @param {Setter<S,State>} props.set
 * @param {Action<S, any> | [Action<S, X>, X]} props.onDone
 * @returns {Model<S>}
 */
export default ({ get, set, onDone }) => {
  /** @type {Action<S, any>}*/
  const Start = state => (get(state) === 0 ? set(state, 1) : state)

  /** @type {Action<S, any>}*/
  const Done = state =>
    get(state) === 1
      ? [
          set(state, 2),
          [
            disp => {
              disp(onDone)
            },
            null,
          ],
        ]
      : state

  /** @type {Action<S, any>}*/
  const Init = state => set(state, 0)

  /**
   * @template S
   * @param {S} state
   * @param {string} name
   * @param {ElementVNode<S>} vnode
   * @returns {ElementVNode<S> | false}
   */
  const apply = (state, name, vnode) => {
    let transitionState = get(state)

    if (transitionState === 2) return false

    //@ts-ignore
    vnode.props.class = [
      vnode.props.class || "",
      {
        [name]: true,
        [name + "-run"]: transitionState === 1,
      },
    ]

    if (transitionState === 1) {
      //@ts-ignore
      vnode.props.ontransitionend = Done
    }

    return vnode
  }

  return { Init, Start, apply }
}
