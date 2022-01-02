import { app } from "hyperapp"
import persistence from "@/lib/io/persistence.js"
import Model from "./models/main.js"
import StartPage from "./start-page.js"
import ProblemPage from "./problem-page.js"
import CorrectPage from "./correct-page.js"
import IncorrectPage from "./incorrect-page.js"

/** @typedef {import('./models/main.js').State} State */

const model = Model({
  /** @param {State} x*/
  get: x => x,
  set: (_, y) => y,
})

const startPage = StartPage({
  page: model.pages.start,
  scoring: model.scoring,
  settings: model.settings,
})

const problemPage = ProblemPage({
  page: model.pages.problem,
})

const correctPage = CorrectPage({
  page: model.pages.correct,
})
const incorrectPage = IncorrectPage({
  page: model.pages.incorrect,
})

const node = document.getElementById("app")
if (!node) throw new Error("app mount node missing")
app({
  init: model.Init,
  view: state => {
    let page = model.getPageName(state)
    return page === "problem"
      ? problemPage.view(state)
      : page === "correct"
      ? correctPage.view(state)
      : page === "incorrect"
      ? incorrectPage.view(state)
      : startPage.view(state)
  },
  subscriptions: state => {
    let page = model.getPageName(state)
    return [
      state?.scoring && [
        persistence,
        {
          key: "arithmentist-score",
          data: model.getScoreData(state),
          SetData: model.SetScoreData,
        },
      ],
      ...(page === "problem"
        ? problemPage.subs(state)
        : page === "correct"
        ? correctPage.subs(state)
        : page === "incorrect"
        ? incorrectPage.subs(state)
        : startPage.subs(state)),
    ]
  },
  node,
})
