import { input } from "../lib/html.js"
import { withTargetValue } from "../lib/decorators.js"

/**
 * @template S
 * @param {object} props
 * @param {string} props.value
 * @param {import('hyperapp').Action<S, string>} props.SetValue
 */
export default props =>
  input({
    type: "text",
    value: props.value,
    oninput: withTargetValue(props.SetValue),
  })
