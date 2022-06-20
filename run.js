import { app } from "hyperapp"
import Main from "app/main.js"
const main = Main({ get: x => x, set: (_, x) => x })
const node = document.getElementById("app")
if (!node) throw new Error("no mount point for app")
app({
  init: main.Init,
  view: main.view,
  subscriptions: main.subs,
  node,
})
