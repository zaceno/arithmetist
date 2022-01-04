import onwindowevent from "@/lib/io/on-window-event.js"
import PickerView from "@/views/table-picker.js"

/**
 * @typedef State
 * @prop {number | null} trackingStart
 * @prop {number | null} boxWidth
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {Getter<S, number>} props.getMaxTable
 * @param {Getter<S, {number:number, ratio:number}[]>} props.getRatios
 * @param {Action<S, number>} props.SetMaxTable
 */
export default ({ get, set, getMaxTable, SetMaxTable, getRatios }) => {
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
      [
        dispatch => {
          dispatch(
            SetMaxTable,
            +(/** @type {string} */ (element.getAttribute("data-number")))
          )
        },
        null,
      ],
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
      [
        disp => {
          disp(SetMaxTable, getMaxTable(state) + boxdiff)
        },
        null,
      ],
    ]
  }

  /** @type {Action<S, any>}*/
  const StopTracking = state =>
    set(state, { trackingStart: null, boxWidth: null })

  /** @param {S} state*/
  const isTracking = state => !!get(state)?.trackingStart

  /** @param {S} state */
  const view = state =>
    PickerView({
      value: getMaxTable(state),
      ratios: getRatios(state),
      TouchDown,
    })

  /** @param {S} state */
  const subs = state => {
    if (!isTracking(state)) return []
    return [
      onwindowevent("touchmove", TouchMove),
      onwindowevent("mousemove", TouchMove),
      onwindowevent("touchend", StopTracking),
      onwindowevent("mouseup", StopTracking),
    ]
  }
  return { Init, view, subs }
}
