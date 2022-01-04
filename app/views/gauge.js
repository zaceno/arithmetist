import { div } from "@hyperapp/html"

/**
 * @param {object} props
 * @param {number} props.full
 * @param {number} props.level
 */
export default ({ full, level }) => {
  const width = full === 0 ? 0 : (100 * Math.min(level, full)) / full
  return div(
    {
      class: "gauge gauge-container",
    },
    div({
      class: "gauge-filler",
      style: {
        width: width + "%",
      },
    })
  )
}
