import { div } from "../../lib/html.js"

/**
 * @param {object} props
 * @param {number} props.elapsed
 */
export default props =>
  div(
    { class: "timer timercontainer" },
    div({
      class: "timerbar",
      style: { width: "" + Math.round(props.elapsed * 100) + "%" },
    })
  )
