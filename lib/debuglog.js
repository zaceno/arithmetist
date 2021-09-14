/** @template S @typedef {import('hyperapp').Dispatch<S> } Dispatch*/

/** @type {string}*/
let debugName = "INIT"
/** @type {any}*/
let debugPayload = null

/** @type {<S>(d:Dispatch<S>)=>Dispatch<S>}*/
export default d => (action, payload) => {
  if (typeof action === "function") {
    debugName = action.name
    debugPayload = payload
  } else if (!Array.isArray(action)) {
    //action is new state
    console.debug(debugName, debugPayload, action)
    debugName = ""
    debugPayload = null
  }
  return d(action, payload)
}
