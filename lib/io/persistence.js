/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/** @template S @typedef {import('hyperapp').Dispatch<S>} Dispatch */
/** @template S,X @typedef {import('hyperapp').Subscription<S, X>} Subscription */

/** @type {Record<string, boolean>} */
const didRun = {}

/**
 * @template S, X
 * @typedef PersistProps
 * @prop {string} key
 * @prop {X} data
 * @prop {Action<S,X>} SetData
 */

/**
 * @template S,X
 * @param {Dispatch<S>} dispatch
 * @param {PersistProps<S,X>} options
 */
const persist = (dispatch, options) => {
  if (!didRun[options.key]) {
    didRun[options.key] = true
    const json = localStorage.getItem(options.key)
    if (!!json) {
      let data = /** @type {X}*/ (JSON.parse(json))
      requestAnimationFrame(() => {
        dispatch(options.SetData, data)
      })
    }
  } else {
    localStorage.setItem(options.key, JSON.stringify(options.data))
  }
  return () => {}
}

/**
 * @template S,X
 * @param {PersistProps<S,X>['key']} key
 * @param {PersistProps<S,X>['data']} data
 * @param {PersistProps<S,X>['SetData']} SetData
 * @returns {Subscription<S, PersistProps<S,X>> | false}
 */
export default (key, data, SetData) =>
  !!data && [persist, { key, data, SetData }]
