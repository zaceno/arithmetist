import TablePicker from "./table-picker.js"
import { div, p, text, label, input } from "@hyperapp/html"
import clickableIcon from "@/views/clickable-icon.js"
import pageContainer from "@/views/page-container.js"
import { iconChecked, iconUnchecked } from "@/views/icons.js"
import { startButton } from "@/views/nav-buttons.js"
import Transition from "./transition.js"
import appInfo from "@/views/app-info.js"

/**
 * @typedef State
 * @prop {import('./table-picker.js').State} tables
 * @prop {import('./transition.js').State} modal
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {Action<S, any>} props.Next
 * @param {import('./scoring-model.js').Model<S>} props.scoring
 * @param {import('./settings-model.js').Model<S>} props.settings
 */
export default ({ get, set, scoring, settings, Next }) => {
  /** @type {Action<S, any>} */
  const Init = state => [
    set(state, /** @type {State}*/ ({})),
    [
      dispatch => {
        dispatch(tables.Init)
        dispatch(modal.Init)
      },
      null,
    ],
  ]

  const tables = TablePicker({
    get: state => get(state)?.tables,
    set: (state, tables) => set(state, { ...(get(state) || {}), tables }),
    getMaxTable: settings.getMax,
    SetMaxTable: settings.SetMax,
    getRatios: scoring.getRatios,
  })

  const modal = Transition({
    get: state => get(state)?.modal,
    set: (state, modal) => set(state, { ...(get(state) || {}), modal }),
  })

  /** @param {S} state */
  const view = state =>
    pageContainer({ classext: "startpage" }, [
      modal.apply(state, ({ showing, hiding }) =>
        div(
          {
            class: {
              "modal-overlay": true,
              "modal-animating": showing || hiding,
            },
          },
          div(
            {
              class: {
                "modal-container": true,
                "modal-animating": showing || hiding,
              },
            },
            [
              div(
                { class: "modal-header" },
                clickableIcon({ name: "cancel", onclick: modal.Hide })
              ),
              div(
                { class: "modal-content" },
                appInfo({ ResetScore: scoring.Init })
              ),
            ]
          )
        )
      ),
      clickableIcon({ name: "info", onclick: modal.Show }),
      div(
        {
          class: "score-display",
          style: {
            position: "absolute",
            top: "4rem",
            left: "15px",
            right: "15px",
          },
        },
        [
          p(
            {
              class: "score-display-label",
              style: {
                padding: "0",
                margin: "0",
                fontSize: "1.4rem",
                textAlign: "center",
              },
            },
            text("score:")
          ),
          p(
            {
              class: "score-display-value",
              style: {
                fontSize: "2.7rem",
                textAlign: "center",
                padding: "0",
                margin: "0",
              },
            },
            text(scoring.getScore(state))
          ),
        ]
      ),
      div({ class: "table-picker" }, [p(text("Tables:")), tables.view(state)]),
      p(
        { class: "practice-mode-toggle" },
        label([
          input({
            style: { display: "none" },
            type: "checkbox",
            checked: settings.isPracticeMode(state),
            oninput: settings.TogglePractice,
          }),
          settings.isPracticeMode(state) ? iconChecked() : iconUnchecked(),
          text("Practice mode"),
        ])
      ),
      startButton({ action: Next }),
    ])

  const subs = tables.subs

  return { Init, view, subs }
}
