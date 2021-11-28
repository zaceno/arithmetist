import { label as lbl, text, input, i, div, p, span } from "@hyperapp/html"

/**
 * @template S
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.extra]
 * @param {boolean} props.value
 * @param {Action<S, any>} props.toggle
 */
export default ({ label, toggle, value, extra }) =>
  div({ class: "checkbox" }, [
    p({ class: "checkbox-label" }, text(label)),
    p(
      { class: "checkbox-input-container" },
      input({
        class: "checkbox-input",
        type: "checkbox",
        checked: value,
        oninput: toggle,
      })
    ),
    !!extra && p({ class: "checkbox-extra" }, text(`(${extra})`)),
  ])
