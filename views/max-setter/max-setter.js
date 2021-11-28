import { div, br, input, text } from "@hyperapp/html"

/**
 * @template S
 * @param {object} props
 * @param {{number:number, ratio:number}[]} props.ratios
 * @param {number} props.max
 * @param {number} props.min
 * @param {Action<S, number>} props.SetMax
 */
export default ({ ratios, min, max, SetMax }) =>
  div({ class: "max-setter" }, [
    div(
      { class: "max-setter-row" },
      ratios.map(({ ratio, number }) =>
        div(
          {
            class: "max-setter-block",
            style: {
              backgroundColor:
                number <= max ? `hsla(${ratio * 100} , 80%, 40%)` : "#555",
            },
            onclick: [SetMax, number],
            ontouchstart: (_, event) => {
              event.preventDefault()
              return [SetMax, number]
            },
          },
          text(number)
        )
      )
    ),
    br({}),

    input({
      class: "max-setter-slider",
      border: "1px white solid",
      type: "range",
      value: max,
      min: min,
      max: 12,
      step: 1,
      oninput: (_, event) => [
        SetMax,
        +(/**@type {HTMLInputElement}*/ (event.target).value),
      ],
    }),
  ])
