import Transition from "lib/transition.js"
import TablePicker from "app/table-picker.js"
import pageView from "app/views/start-page.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S, X @typedef {import('hyperapp').Subscription<S, X>} Subscription */
/** @template S @typedef {(s:S) => (Subscription<S,any> | boolean | undefined )[]} Subs */

/**
 * @typedef State
 * @prop {import("app/table-picker.js").State} tables
 * @prop {import("lib/transition.js").State} modal
 */

/**
 * @template S
 * @typedef StartPageProps
 * @prop {(s:S) => State} get
 * @prop {(s:S, pageState:State) => S} set
 * @prop {(s:S) => number} getScore
 * @prop {(s:S) => ({number:number, ratio:number}[])} getRatios
 * @prop {(s:S) => number} getMaxTable
 * @prop {(s:S) => boolean} getPracticeMode
 * @prop {Action<S, number>} SetMaxTable
 * @prop {Action<S, any>} TogglePracticeMode
 * @prop {Action<S, any>} ResetScore
 * @prop {Action<S, {left:number, right:number}>} Problem
 */

/**
 * @template S
 * @param {StartPageProps<S>} props
 */
export default ({
  get,
  set,
  getScore,
  getRatios,
  getMaxTable,
  getPracticeMode,
  SetMaxTable,
  TogglePracticeMode,
  Problem,
  ResetScore,
}) => {
  const tables = TablePicker({
    get: state => get(state)?.tables,
    set: (state, tables) => set(state, { ...(get(state) || {}), tables }),
    getMaxTable,
    SetMaxTable,
  })

  const modal = Transition({
    get: state => get(state).modal,
    set: (state, modal) => set(state, { ...get(state), modal }),
  })

  /** @type {Action<S, any>} */
  const Init = state => [
    set(state, /** @type {State}*/ ({})),
    d => d(tables.Init),
    d => d(modal.Init),
  ]

  const subs = tables.subs

  /**
   * @param {S} state
   */
  const view = state => {
    return pageView({
      score: getScore(state),
      maxTable: getMaxTable(state),
      practiceMode: getPracticeMode(state),
      tablePicker: { ...tables.model(state), ratios: getRatios(state) },
      modalTransition: modal.model(state),
      Problem,
      ResetScore,
      TogglePracticeMode,
    })
  }

  return { Init, view, subs }
}
