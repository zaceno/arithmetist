type Action<S, X> = import("hyperapp").Action<S, X>
type Subscription<S, X> = import("hyperapp").Subscription<S, X>
type Dispatch<S> = import("hyperapp").Dispatch<S>
type ElementVNode<S> = import("hyperapp").ElementVNode<S>
type Effecter<S, X> = (
  dispatch: Dispatch<S>,
  payload: X
) => void | Promise<void>

type Getter<Global, Local> = (state: Global) => Local

type Setter<Global, Local> = (state: Global, local: Local) => Global
type Dispatchable<S, P = any> = import("hyperapp").Dispatchable<S, P>
type ActionLike<S, X, Y> = Action<S, X> | [Action<S, Y>, Y]
type ClassProp = import("hyperapp").ClassProp
