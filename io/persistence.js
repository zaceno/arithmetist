let firstRun = true
const LS_KEY = "arithmetist-state"

/**
 * @template S
 * @param {Dispatch<S>} dispatch
 * @param {S} data
 */
export default (dispatch, data) => {
  if (firstRun) {
    firstRun = false
    const json = localStorage.getItem(LS_KEY)
    if (!!json) {
      data = JSON.parse(json)
      requestAnimationFrame(() => {
        dispatch(data)
      })
    }
  } else {
    localStorage.setItem(LS_KEY, JSON.stringify(data))
  }
  return () => {}
}

/*
{"scoring":[{"number":3,"seen":19,"wins":19},{"number":8,"wins":0,"seen":0},{"number":9,"wins":0,"seen":0},{"number":10,"wins":0,"seen":0},{"number":11,"wins":0,"seen":0},{"number":12,"wins":0,"seen":…
*/
