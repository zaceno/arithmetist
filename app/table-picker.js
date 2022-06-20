import onWindowEvent from "lib/io/on-window-event.js"
import { text, div } from "@hyperapp/html"

/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */

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
 * @prop {import('app/settings.js').Model<S>} settings
 */
/**
 * @template S
 * @param {TablePickerProps<S>} props
 */
export default ({ get, set, settings }) => {
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
      d => d(settings.SetMaxTable, +(element.getAttribute("data-number") || 0)),
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
      d => d(settings.SetMaxTable, settings.getMaxTable(state) + boxdiff),
    ]
  }

  /** @type {Action<S, any>}*/
  const StopTracking = state =>
    set(state, { trackingStart: null, boxWidth: null })

  /** @param {S} state*/
  const isTracking = state => !!get(state)?.trackingStart

  /** @template S @param {S} state */
  const subs = state => {
    if (!isTracking(state)) return []
    return [
      onWindowEvent("touchmove", TouchMove),
      onWindowEvent("mousemove", TouchMove),
      onWindowEvent("touchend", StopTracking),
      onWindowEvent("mouseup", StopTracking),
    ]
  }

  /** @template S
   * @param {S} state
   * @param {{number: number, ratio: number}[]} ratios
   */
  const view = (state, ratios) => {
    let maxTable = settings.getMaxTable(state)
    return div({ class: "table-picker-container" }, [
      div(
        {
          class: "table-picker-row",
        },
        ratios.map(({ ratio, number }) =>
          div(
            {
              onmousedown: TouchDown,
              ontouchstart: TouchDown,
              "data-number": number,
              class: "table-picker-block",
              style: {
                backgroundColor:
                  number <= maxTable
                    ? `hsla(${
                        ratio * 80 + 20
                      } , var(--color-saturation), var(--color-lightness)`
                    : "#555",
              },
            },
            text(number)
          )
        )
      ),
    ])
  }

  return {
    Init,
    subs,
    view,
  }
}
