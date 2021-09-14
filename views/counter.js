import { div, h1, button, text } from "../lib/html.js"

/**
 * @template S
 * @param {object} props
 * @param {number} props.value
 * @param {import('hyperapp').Action<S, number>} props.SetValue
 */
export default props =>
  div([
    h1(text(props.value)),
    button({ onclick: [props.SetValue, props.value - 1] }, text("-")),
    button({ onclick: [props.SetValue, props.value + 1] }, text("+")),
  ])
