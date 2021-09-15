import { app } from "hyperapp"
import { main } from "./lib/html.js"
import { Init } from "./actions.js"
import initial from "./initial.js"
import problem from "./problem.js"
import answer from "./answer.js"
import persistence from "./lib/persistence.js"
app({
  node: /** @type {HTMLElement}*/ (document.getElementById("app")),
  init: Init(),
  view: (/**@type {import('./actions.js').State} */ state) =>
    main(
      state.mode === "problem"
        ? problem(state)
        : state.mode === "answer"
        ? answer(state)
        : initial(state)
    ),
  //  dispatch: persistence,
})
