import { span, text } from "@hyperapp/html"

/**
 * @param {string} name
 * @param {ClassProp} [cls]
 */
export const icon = (name, cls) =>
  span({ class: [cls, "material-icons"] }, text(name))

/** @type {(name:string) => <S>(cls?:ClassProp) => ElementVNode<S>}*/
const named = name => cls => icon(name, cls)

export const iconUnchecked = named("circle")
export const iconChecked = named("check_circle")
export const iconGo = named("play_circle")
