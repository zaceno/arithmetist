import TablePicker from "./table-picker.js"
import Modal from "./modal.js"

/**
 * @typedef State
 * @prop {import('./table-picker.js').State} tables
 * @prop {import('./modal.js').State} info
 */

/**
 * @template S
 * @typedef Props
 * @prop {Getter<S, State>} get
 * @prop {Setter<S, State>} set
 * @prop {Getter<S, number>} getMaxTable
 * @prop {Action<S, number>} SetMaxTable
 * @prop {Action<S, any>} Next
 */

/**
 * @template S
 * @typedef Model
 * @prop {Action<S, any>} Init
 * @prop {import('./table-picker.js').Model<S>} tables
 * @prop {import('./modal.js').Model<S>} info
 * @prop {Action<S, any>} Next
 */

/**
 * @template S
 * @param {Props<S>} props
 * @returns {Model<S>}
 */
export default ({ get, set, getMaxTable, SetMaxTable, Next }) => {
  /** @type {Action<S, any>} */
  const Init = state => [
    set(state, /** @type {State}*/ ({})),
    [
      dispatch => {
        dispatch(tables.Init)
        dispatch(info.Init)
      },
      null,
    ],
  ]

  const tables = TablePicker({
    get: state => get(state)?.tables,
    set: (state, tables) => set(state, { ...(get(state) || {}), tables }),
    getMaxTable,
    SetMaxTable,
  })

  const info = Modal({
    get: state => get(state)?.info,
    set: (state, info) => set(state, { ...(get(state) || {}), info }),
  })

  return { Init, tables, info, Next }
}
