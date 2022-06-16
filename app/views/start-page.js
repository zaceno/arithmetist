import { page } from "./common.js"
import { button, icon, toggle, clickableIcon } from "lib/widgets/widgets.js"
import { h3, h2, p, text, main, aside, header, div } from "@hyperapp/html"
/** @template S,X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S @typedef {import('lib/transition.js').TransitionModel<S>} TransitionModel */

/**
 * @template S
 * @typedef TablePickerProps
 * @prop {number} maxTable
 * @prop {{number:number, ratio:number}[]} ratios
 * @prop {Action<S, MouseEvent|TouchEvent>} TouchDown
 */

/** @template S @param {TablePickerProps<S>} props */
const tablePicker = ({ ratios, TouchDown, maxTable }) =>
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

/** @template S @param {Action<S, any>} ResetScore */
const infoContent = ResetScore => [
  p(
    text(`
    This application lets you practice multiplication tables.
    Your score and settings are stored only on this device.
    Not sent to a server. No account or login needed. Use this
    button to reset your score:
  `)
  ),
  p(button({ action: ResetScore, label: "Reset Score" })),
  p(
    text(`
    The table selector lets you limit the number of multiplication
    tables trained, and indicates your level of skill with each
    table by how green it is.  
  `)
  ),
  p(
    text(`
    In practice mode, there is no timer to the problems, but you 
    also don't score points for solving problems in practice mode.
  `)
  ),
]

/**
 * @template S
 * @param {object} props
 * @param {Action<S, any>} props.ResetScore
 * @param {TransitionModel<S>} props.transition
 */
const infoModal = props =>
  props.transition.status.hidden
    ? false
    : div(
        {
          class: {
            modal: true,
            modalOverlayReady: props.transition.status.ready,
            modalOverlayAppearing: props.transition.status.appearing,
            modalOverlayHiding: props.transition.status.hiding,
          },
          ontransitionend: props.transition.OnTransitionEnd,
        },
        aside(
          {
            class: {
              modalWindowReady: props.transition.status.ready,
              modalWindowAppearing: props.transition.status.appearing,
              modalWindowHiding: props.transition.status.hiding,
            },
          },
          [
            header(
              clickableIcon({ name: "close", action: props.transition.Hide })
            ),
            main(infoContent(props.ResetScore)),
          ]
        )
      )

/**
 * @template S
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.maxTable
 * @param {boolean} props.practiceMode
 * @param {TablePickerProps<S>} props.tablePicker
 * @param {TransitionModel<S>} props.modalTransition
 * @param {Action<S, any>} props.ResetScore
 * @param {Action<S, any> } props.Problem
 * @param {Action<S, any> } props.TogglePracticeMode
 */

export default props =>
  page({
    top: [
      clickableIcon({
        name: "info",
        action: props.modalTransition.Show,
        class: "info-modal",
      }),
      infoModal({
        ResetScore: props.ResetScore,
        transition: props.modalTransition,
      }),
    ],
    main: [
      h3({ class: "title" }, text("Multiplication Trainer")),
      h2({ class: "score" }, text("Score: " + props.score)),
      p([text("Select tables:"), tablePicker(props.tablePicker)]),
      p(
        toggle(
          { on: props.practiceMode, OnToggle: props.TogglePracticeMode },
          "Practice mode:"
        )
      ),
    ],
    bottom: button({
      class: "startbutton",
      action: props.Problem,
      label: [text("Start"), icon("keyboard_double_arrow_right")],
    }),
  })
