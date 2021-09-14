import { app } from "hyperapp"
import { main, h1, h2, text } from "./lib/html.js"
import counter from "./views/counter.js"
import textInput from "./views/text-input.js"
/**
 * @template X
 * @typedef {import('hyperapp').Action<State, X>} Action
 */

/**
 * @typedef State
 * @prop {string} name
 * @prop {number} count
 */

/** @type {Action<number>} */
const SetCount = (state, count) => ({ ...state, count })

/** @type {Action<string>} */
const SetName = (state, name) => ({ ...state, name })

app({
  node: /** @type {HTMLElement}*/ (document.getElementById("app")),
  init: { count: 0, name: "John Doe" },
  view: (/**@type {State} */ state) =>
    main([
      h1(text("Hello, " + state.name)),
      h2(text("A counter:")),
      counter({ value: state.count, SetValue: SetCount }),
      h2(text("Enter your name:")),
      textInput({ value: state.name, SetValue: SetName }),
    ]),
})
