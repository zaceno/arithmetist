import persistence from "lib/io/persistence.js"
import Scoring from "app/scoring.js"
import Settings from "app/settings.js"
import Flow from "app/flow.js"
/** @template S, X @typedef {import('hyperapp').Action<S, X>} Action */
/**
 * @typedef State
 * @prop {import('app/scoring.js').State} scoring
 * @prop {import('app/settings.js').State} settings
 * @prop {import('app/flow.js').State} flow
 */
/**
 * @template S
 * @param {object} props
 * @param {(s:S) => State} props.get
 * @param {(s:S, x:State) => S} props.set
 */
export default ({ get, set }) => {
  /** @type {Action<S, any>} */
  const Init = state => [
    set(state, /** @type {State}*/ ({})),
    d => d(settings.Init),
    d => d(scoring.Init),
    d => d(flow.Init),
  ]

  const scoring = Scoring({
    /** @param {S} state*/
    get: state => get(state).scoring,
    set: (state, scoring) => ({ ...state, scoring }),
  })

  const settings = Settings({
    /** @param {S} state */
    get: state => get(state).settings,
    set: (state, settings) => set(state, { ...get(state), settings }),
  })

  const flow = Flow({
    /** @param {S} state */
    get: state => get(state).flow,
    set: (state, flow) => set(state, { ...get(state), flow }),
    settings,
    scoring,
  })

  /** @param {S} state*/
  const getPersistentData = state => {
    let { scoring, settings } = get(state)
    return { scoring, settings }
  }

  /** @type {Action<S, Pick<State, 'scoring' | 'settings'>>} */
  const SetPersistentData = (state, data) =>
    set(state, { ...get(state), ...data })

  /** @param {S} state*/
  const view = state => flow.view(state)

  /** @param {S} state*/
  const subs = state => [
    persistence(
      "multiplication-trainer",
      getPersistentData(state),
      SetPersistentData
    ),
    ...flow.subs(state),
  ]

  return { Init, view, subs }
}
