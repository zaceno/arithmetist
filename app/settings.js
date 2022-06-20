/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/**
 * @typedef State
 * @prop {number} maxTable
 * @prop {boolean} practiceMode
 */
/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {Action<S, number>} SetMaxTable
 * @prop {Action<S, any>} TogglePracticeMode
 * @prop {(s:S) => number} getMaxTable
 * @prop {(s:S) => boolean} getPracticeMode
 */
/**
 * @template S
 * @param {object} props
 * @param {(s:S) => State} props.get
 * @param {(s:S, x:State) => S} props.set
 * @returns {Model<S>}
 */
export default ({ get, set }) => {
  /** @type {Model<S>['Init']}*/
  const Init = state =>
    set(state, {
      practiceMode: false,
      maxTable: 7,
    })

  /** @type {Model<S>['SetMaxTable']}*/
  const SetMaxTable = (state, maxTable) => {
    //limit max table to between 3 and 12 inclusive
    maxTable = Math.max(Math.min(12, maxTable), 3)
    return set(state, { ...get(state), maxTable })
  }

  /** @type {Model<S>['TogglePracticeMode']}*/
  const TogglePracticeMode = state => {
    let local = { ...get(state) }
    local.practiceMode = !local.practiceMode
    return set(state, local)
  }

  /** @type {Model<S>['getPracticeMode']}*/
  const getPracticeMode = state => get(state).practiceMode

  /** @type {Model<S>['getMaxTable']}*/
  const getMaxTable = state => get(state).maxTable

  return {
    Init,
    getMaxTable,
    SetMaxTable,
    getPracticeMode,
    TogglePracticeMode,
  }
}
