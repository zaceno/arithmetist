import keypad from "@/views/keypad/keypad.js"

/**
 * @template S
 * @param {object} props
 * @param {import('./models/entry.js').Model<S>} props.entry
 * @param {Action<S, number>} props.OnSubmit
 * @returns {(state:S) => ElementVNode<S>}
 */
export default ({ entry, OnSubmit }) =>
  state =>
    keypad({
      OnDigit: entry.Digit,
      OnBack: entry.Back,
      OnEnter: state => [OnSubmit, entry.getValue(state)],
    })
