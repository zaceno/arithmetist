import Transition from "./transition.js"
import nextFrame from "@/lib/io/next-frame.js"
import { correctBadge } from "@/views/badges.js"
import pageContainer from "@/views/page-container.js"
import gauge from "@/views/gauge.js"
import { backButton, nextButton } from "@/views/nav-buttons.js"
import problem from "@/views/problem.js"

/**
 * @typedef State
 * @prop {import('./transition.js').State} transition
 * @prop {number} left
 * @prop {number} right
 */

/**
 * @template S
 * @param {object} props
 * @param {Getter<S, State>} props.get
 * @param {Setter<S, State>} props.set
 * @param {Action<S, any>} props.Continue
 */
export default ({ get, set, Continue }) => {
  const exiter = Transition({
    get: state => get(state)?.transition,
    set: (state, transition) =>
      set(state, { ...(get(state) || {}), transition }),
    OnDoneHiding: Continue,
  })

  /** @type {Action<S, {left: number, right: number}>}*/
  const Init = (state, { left, right }) => [
    set(state, /** @type {State}*/ ({ left, right })),
    [
      dispatch => {
        dispatch(exiter.Init, true)
      },
      null,
    ],
    nextFrame(exiter.Hide),
  ]

  /** @param {S} state */
  const view = state => {
    const { left, right } = get(state)
    return pageContainer({ classext: "correctpage" }, [
      gauge({ level: 0, full: 1 }),
      backButton({ disabled: true, action: x => x }),
      problem({
        left,
        right,
        answer: left * right,
      }),
      exiter.apply(state, ({ showing, hiding }) =>
        correctBadge({
          class: { "pop-out": true, "pop-out-run": showing || hiding },
        })
      ),
      nextButton({ action: x => x }),
    ])
  }

  /** @param {any} _*/
  const subs = _ => []

  return { Init, view, subs }
}
