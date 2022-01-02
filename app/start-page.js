import PageView from "@/views/start-page.js"
import AppInfoModal from "@/app-info-modal.js"
import TablePicker from "@/table-picker.js"
/**
 * @template S
 * @param {object} props
 * @param {import('@/models/scoring.js').Model<S>} props.scoring
 * @param {import('@/models/settings.js').Model<S>} props.settings
 * @param {import('@/models/start-page.js').Model<S>} props.page
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
