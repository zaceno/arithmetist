import { main } from "@hyperapp/html"

/**
 * @template S
 * @param {object} props
 * @param {ClassProp} [props.classext]
 * @param {import('hyperapp').MaybeVNode<S>[]} content
 */
export default ({ classext = "" }, content) =>
  main({ class: ["page", classext] }, content)
