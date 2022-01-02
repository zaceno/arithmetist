import { input, p, text, label, div } from "@hyperapp/html"
import pageContainer from "@/views/page/page.js"
import TablePicker from "@/table-picker.js"
import { startButton } from "@/views/nav-buttons/nav-buttons.js"
import { iconChecked, iconUnchecked } from "@/views/icons/icons.js"
import appInfo from "@/views/app-info.js"
import clickableIcon from "@/views/clickable-icon/clickable-icon.js"

import Model from "@/models/start-page.js"
import modalView from "@/views/modal/modal.js"

/**
 * @template S
 * @typedef {import('@/models/start-page.js').Props<S>} Props
 */

/**
 * @template S
 * @param {Props<S>} props
 * @param {import('@/models/scoring.js').Model<S>} scoring
 */
export default (props, scoring) => {
  const model = Model(props)

  /** @param {S} state*/
  const modalInfoView = state =>
    modalView({
      visible: model.info.isVisible(state),
      animating: model.info.isAnimating(state),
      OnTransitionEnd: model.info.OnTransitionEnd,
      Hide: model.info.Hide,
      render: () => appInfo({ ResetScore: scoring.Init }),
    })

  /** @param {S} state */
  const view = state =>
    

  const subs = tablePicker.subs

  return { Init, view, subs }
}
