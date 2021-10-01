import { div } from "@hyperapp/html"

/** @param {'correct' | 'incorrect'} type*/
export default type => div({ class: ["badge", type] })
