/** @template S @typedef {import('hyperapp').Dispatch<S> } Dispatch*/

const getSaved = () => {
  let json = localStorage.getItem("persistent-state")
  return json ? JSON.parse(json) : null
}

/** @param {any} state */
const setSaved = state => {
  localStorage.setItem("persistent-state", JSON.stringify(state))
}

/** @type {<S>(d:Dispatch<S>)=>Dispatch<S>}*/
export default d => {
  let started = false
  return (action, payload) => {
    if (typeof action !== "function" && !Array.isArray(action)) {
      if (started) {
        setSaved(action)
      } else {
        started = true
        let prev = getSaved()
        if (!prev) {
          setSaved(action)
        } else {
          action = prev
        }
      }
    }
    return d(action, payload)
  }
}
