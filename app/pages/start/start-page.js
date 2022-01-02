import PageView from "./start-page-view.js"
import AppInfoModal from "./app-info-modal/app-info-modal.js"
import TablePicker from "./table-picker/table-picker.js"
/**
 * @template S
 * @param {object} props
 * @param {import('@/scoring-model.js').Model<S>} props.scoring
 * @param {import('@/settings-model.js').Model<S>} props.settings
 * @param {import('./start-page-model.js').Model<S>} props.page
 */
export default ({ scoring, settings, page }) => {
  const appInfoModal = AppInfoModal({ modal: page.info, scoring })
  const tablePicker = TablePicker({ picker: page.tables, settings, scoring })

  /** @param {S} state */
  const view = state =>
    PageView({
      score: scoring.getScore(state),
      practiceMode: settings.isPracticeMode(state),
      TogglePracticeMode: settings.TogglePractice,
      StartProblem: page.Next,
      ShowAppInfo: page.info.Show,
      appInfoModal: appInfoModal(state),
      tablePicker: tablePicker.view(state),
    })

  const subs = tablePicker.subs

  return { view, subs }
}
