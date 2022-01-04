import { p, text } from "@hyperapp/html"
import button from "@/views/button.js"

/**
 * @template S
 * @param {object} props
 * @param {Action<S, Event>} props.ResetScore
 */
export default ({ ResetScore }) => [
  p(
    text(`
    This application helps you learn multiplication tables.
    You don't need to make an account or log in, and none of your
    results are sent anywhere from your device.
  `)
  ),
  p(
    text(`
    You can select which tables you'd like to practice using the
    tables selector. The color of the tables selector indicates how
    well you've shown you know each table. Red = not so well,
    Green = you've got it.
  `)
  ),
  p(
    text(`
    The score represents your total skill with all tables.
  `)
  ),
  p(
    text(`
    If you don't want the timer when you practice the tables,
    enable "practice mode". But in practice mode your
    answers don't count toward your score.
  `)
  ),
  p(
    text(`
    If you would like to reset your score, click here:
  `)
  ),
  button({
    label: "Reset Score",
    action: ResetScore,
  }),
]
