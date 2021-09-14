import { div } from "../../lib/html.js"

/** @param {'correct' | 'incorrect'} type*/
export default type => div({ class: `badge ${type}` })
