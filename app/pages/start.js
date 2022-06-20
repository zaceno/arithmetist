import Transition from "lib/transition.js"
import TablePicker from "app/table-picker.js"
import { page } from "app/views.js"
import { button, icon, toggle, clickableIcon } from "lib/widgets/widgets.js"
import { h3, h2, p, text, main, aside, header, div } from "@hyperapp/html"
/** @template S,X @typedef {import('hyperapp').Action<S, X>} Action */

/**
 * @typedef State
 * @prop {import("app/table-picker.js").State} tables
 * @prop {import("lib/transition.js").State} modal
 */

/**
 * @template S
 * @typedef StartPageProps
 * @prop {(s:S) => State} get
 * @prop {(s:S, pageState:State) => S} set
 * @prop {import('app/settings.js').Model<S>} settings
 * @prop {import('app/scoring.js').Model<S>} scoring
 * @prop {Action<S, any>} Problem
 */

/**
 * @template S
 * @param {StartPageProps<S>} props
 */
export default ({ get, set, settings, scoring, Problem }) => {
  const tables = TablePicker({
    get: state => get(state)?.tables,
    set: (state, tables) => set(state, { ...(get(state) || {}), tables }),
    settings,
  })

  const modal = Transition({
    get: state => get(state).modal,
    set: (state, modal) => set(state, { ...get(state), modal }),
  })

  /** @type {Action<S, any>} */
  const Init = state => [
    set(state, /** @type {State}*/ ({})),
    d => d(tables.Init),
    d => d(modal.Init),
  ]

  /** @param {S} state */
  const subs = tables.subs

  /** @param {S} state */
  const view = state => {
    let transitionStatus = modal.status(state)

    return page({
      top: [
        clickableIcon({
          name: "info",
          action: modal.Show,
          class: "info-modal",
        }),
        infoModal({
          transitionStatus,
          ResetScore: scoring.Init,
          OnTransitionEnd: modal.OnTransitionEnd,
          Hide: modal.Hide,
        }),
      ],
      main: [
        h3({ class: "title" }, text("Multiplication Trainer")),
        h2({ class: "score" }, text("Score: " + scoring.getScore(state))),
        p([
          text("Select tables:"),
          tables.view(state, scoring.getRatios(state)),
        ]),
        p(
          toggle(
            {
              on: settings.getPracticeMode(state),
              OnToggle: settings.TogglePracticeMode,
            },
            "Practice mode:"
          )
        ),
      ],
      bottom: button({
        class: "startbutton",
        action: Problem,
        label: [text("Start"), icon("keyboard_double_arrow_right")],
      }),
    })
  }

  return {
    Init,
    subs,
    view,
  }
}

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
 * @param {Action<S, any>} props.Hide
 * @param {Action<S, TransitionEvent>} props.OnTransitionEnd
 * @param {{hidden: boolean, ready: boolean, appearing: boolean, hiding: boolean}} props.transitionStatus
 */
const infoModal = props =>
  props.transitionStatus.hidden
    ? false
    : div(
        {
          class: {
            modal: true,
            modalOverlayReady: props.transitionStatus.ready,
            modalOverlayAppearing: props.transitionStatus.appearing,
            modalOverlayHiding: props.transitionStatus.hiding,
          },
          ontransitionend: props.OnTransitionEnd,
        },
        aside(
          {
            class: {
              modalWindowReady: props.transitionStatus.ready,
              modalWindowAppearing: props.transitionStatus.appearing,
              modalWindowHiding: props.transitionStatus.hiding,
            },
          },
          [
            header(clickableIcon({ name: "close", action: props.Hide })),
            main(infoContent(props.ResetScore)),
          ]
        )
      )
