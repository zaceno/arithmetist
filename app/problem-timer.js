import onanimationframe from "@/lib/io/animation-frame.js"
import gauge from "@/views/gauge/gauge.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./models/timer.js').Model<S>} props.timer
 */
export default ({ timer }) => {
  /** @param {S} state */
  const view = state => gauge(timer.gaugeProps(state))

  /** @param {S} state */
  const subs = state =>
    timer.isRunning(state) ? [onanimationframe(timer.Update)] : []

  return { view, subs }
}
