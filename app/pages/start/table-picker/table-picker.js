import onwindowevent from "@/lib/io/on-window-event.js"
import PickerView from "./table-picker-view.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./table-picker-model.js').Model<S>} props.picker
 * @param {import('@/settings-model.js').Model<S>} props.settings
 * @param {import('@/scoring-model.js').Model<S>} props.scoring
 */
export default ({ picker, settings, scoring }) => {
  /** @param {S} state */
  const view = state =>
    PickerView({
      value: settings.getMax(state),
      ratios: scoring.getRatios(state),
      TouchDown: picker.TouchDown,
    })

  /** @param {S} state */
  const subs = state => {
    if (!picker.isTracking(state)) return []
    return [
      onwindowevent("touchmove", picker.TouchMove),
      onwindowevent("mousemove", picker.TouchMove),
      onwindowevent("touchend", picker.StopTracking),
      onwindowevent("mouseup", picker.StopTracking),
    ]
  }

  return { view, subs }
}
