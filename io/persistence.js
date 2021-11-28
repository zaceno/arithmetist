let firstRun = true
const LS_KEY = "arithmetist-state-2"

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
