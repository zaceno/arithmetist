import onWindowEvent from "lib/io/on-window-event.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S, X @typedef {import('hyperapp').Subscription<S, X>} Subscription */
/** @template S @typedef {(s:S) => (Subscription<S,any> | boolean | undefined  )[]} Subs */

/**
 * @typedef State
 * @prop {number | null} trackingStart
 * @prop {number | null} boxWidth
 */

/**
 * @template S
 * @typedef TablePickerProps
 * @prop {(s:S) => State} get
 * @prop {(s:S, x:State) => S} set
 * @prop {(s:S) => number} getMaxTable
 * @prop {Action<S, number>} SetMaxTable
 */

/**
 * @template S
 * @param {TablePickerProps<S>} props
 */
export default ({ get, set, getMaxTable, SetMaxTable }) => {
  /** @type {Action<S, void>}*/
  const Init = state => set(state, { trackingStart: null, boxWidth: null })

  /** @param {MouseEvent | TouchEvent} event */
  const getX = event => {
    const touch =
      window.TouchEvent && event instanceof TouchEvent
        ? /** @type {Touch}*/ (event.touches.item(0))
        : /** @type {MouseEvent}*/ (event)
    return touch.clientX
  }

  /** @type {Action<S, MouseEvent | TouchEvent>} */
  const TouchDown = (state, event) => {
    event.preventDefault()
    const element = /** @type {HTMLElement}*/ (event.target)
    const rect = element.getBoundingClientRect()
    return [
      set(state, { trackingStart: getX(event), boxWidth: rect.width }),
      d => d(SetMaxTable, +(element.getAttribute("data-number") || 0)),
    ]
  }

  /** @type {Action<S, MouseEvent | TouchEvent>} */
  const TouchMove = (state, event) => {
    const { trackingStart, boxWidth } = get(state)
    if (!trackingStart || !boxWidth) return state

    const boxdiff = Math.round((getX(event) - trackingStart) / boxWidth)
    return [
      set(state, {
        trackingStart: trackingStart + boxdiff * boxWidth,
        boxWidth,
      }),
      d => d(SetMaxTable, getMaxTable(state) + boxdiff),
    ]
  }

  /** @type {Action<S, any>}*/
  const StopTracking = state =>
    set(state, { trackingStart: null, boxWidth: null })

  /** @param {S} state*/
  const isTracking = state => !!get(state)?.trackingStart

  /** @type {Subs<S>} */
  const subs = state => {
    if (!isTracking(state)) return []
    return [
      onWindowEvent("touchmove", TouchMove),
      onWindowEvent("mousemove", TouchMove),
      onWindowEvent("touchend", StopTracking),
      onWindowEvent("mouseup", StopTracking),
    ]
  }

  /** @param {S} state */
  const model = state => ({
    maxTable: getMaxTable(state),
    TouchDown,
  })

  return { Init, model, subs }
}
