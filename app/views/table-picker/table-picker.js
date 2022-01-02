import { div, text } from "@hyperapp/html"
/**
 * @template S
 * @param {object} props
 * @param {number} props.value
 * @param {{ratio: number, number:number}[]} props.ratios
 * @param {Action<S, TouchEvent | MouseEvent>} props.TouchDown
 */
export default ({ ratios, value, TouchDown }) =>
  div({ class: "table-picker-container" }, [
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
                number <= value
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
