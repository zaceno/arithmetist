import { div, text } from "@hyperapp/html"
import onwindowevent from "../io/on-window-event.js"
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
 * @param {(state:S) => number} props.getMax
 * @param {Action<S, number>} props.SetMax
 * @param {(state:S) => {ratio: number, number:number}[]} props.getRatios
 */
export default ({ get, set, getMax, SetMax, getRatios }) => {
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
            SetMax,
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
          disp(SetMax, getMax(state) + boxdiff)
        },
        null,
      ],
    ]
  }

  /** @type {Action<S, any>}*/
  const StopTracking = state =>
    set(state, { trackingStart: null, boxWidth: null })

  /** @param {S} state */
  const view = state => {
    const currentMax = getMax(state)
    return div({ class: "max-setter-container" }, [
      div(
        {
          class: "max-setter-row",
        },
        getRatios(state).map(({ ratio, number }) =>
          div(
            {
              onmousedown: TouchDown,
              ontouchstart: TouchDown,
              "data-number": number,
              class: "max-setter-block",
              style: {
                backgroundColor:
                  number <= currentMax
                    ? `hsla(${
                        ratio * 72 + 14
                      } , var(--scale-saturation), var(--scale-lightness)`
                    : "#555",
              },
            },
            text(number)
          )
        )
      ),
    ])
  }

  /** @param {S} state */
  const subs = state => {
    if (!get(state)?.trackingStart) return []
    return [
      onwindowevent("touchmove", TouchMove),
      onwindowevent("mousemove", TouchMove),
      onwindowevent("touchend", StopTracking),
      onwindowevent("mouseup", StopTracking),
    ]
  }
  return { Init, view, subs }
}
