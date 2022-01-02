import PickerView from "@/views/table-picker/table-picker.js"
import onwindowevent from "@/lib/io/on-window-event.js"

/**
 * @template S
 * @param {object} props
 * @param {import('@/models/table-picker.js').Model<S>} props.picker
 * @param {import('@/models/settings.js').Model<S>} props.settings
 * @param {import('@/models/scoring.js').Model<S>} props.scoring
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
