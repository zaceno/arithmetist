/**
 * @typedef State
 * @prop {number | null} trackingStart
 * @prop {number | null} boxWidth
 */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 * @prop {Getter<S, number>} getMaxTable
 * @prop {Action<S, number>} SetMaxTable
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {Action<S, MouseEvent | TouchEvent>} TouchDown
 * @prop {Action<S, MouseEvent | TouchEvent>} TouchMove
 * @prop {Action<S, any>} StopTracking
 * @prop {(state:S) => boolean} isTracking
 */

/**
 * @template S
 * @param {Props<S>} props
 * @returns {Model<S>}
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

  return { Init, TouchDown, TouchMove, StopTracking, isTracking }
}
