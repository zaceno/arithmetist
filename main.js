import { app } from "hyperapp"
import { main } from "@hyperapp/html"
import { Init, TimerUpdate } from "./actions.js"
import initial from "./initial.js"
import problem from "./problem.js"
import correct from "./correct.js"
import incorrect from "./incorrect.js"
import persistence from "lib/persistence.js"
import interval from "lib/interval.js"

app({
  node: /** @type {HTMLElement}*/ (document.getElementById("app")),
  init: Init(),
  view: (/**@type {import('./actions.js').State} */ state) =>
    main(
      state.mode === "problem"
        ? problem(state)
        : state.mode === "correct"
        ? correct(state)
        : state.mode === "incorrect"
        ? incorrect(state)
        : initial(state)
    ),
  subscriptions: state => [
    state.mode === "problem" && interval(TimerUpdate, 100),
  ],
  dispatch: persistence,
})
