import { div, p, text, label, input } from "@hyperapp/html"
import clickableIcon from "@/lib/views/clickable-icon.js"
import pageContainer from "@/page-container/page-container-view.js"
import { iconChecked, iconUnchecked } from "@/lib/views/icons.js"
import { startButton } from "@/nav-buttons/nav-buttons.js"

/**
 * @template S
 * @param {object} props
 * @param {number} props.score
 * @param {boolean} props.practiceMode
 * @param {Action<S, any>} props.TogglePracticeMode
 * @param {Action<S, any>} props.StartProblem
 * @param {Action<S, any>} props.ShowAppInfo
 * @param {MaybeVNode<S>} props.appInfoModal
 * @param {ElementVNode<S>} props.tablePicker
 */
export default ({
  ShowAppInfo,
  score,
  appInfoModal,
  tablePicker,
  practiceMode,
  TogglePracticeMode,
  StartProblem,
}) =>
  pageContainer({ classext: "startpage" }, [
    appInfoModal,
    clickableIcon({ name: "info", onclick: ShowAppInfo }),
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
          text(score)
        ),
      ]
    ),
    div({ class: "max-setter" }, [p(text("Tables:")), tablePicker]),
    p(
      { class: "practice-mode-toggle" },
      label([
        input({
          style: { display: "none" },
          type: "checkbox",
          checked: practiceMode,
          oninput: TogglePracticeMode,
        }),
        practiceMode ? iconChecked() : iconUnchecked(),
        text("Practice mode"),
      ])
    ),
    startButton({ action: StartProblem }),
  ])
