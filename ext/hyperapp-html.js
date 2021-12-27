import { h } from "./hyperapp.js"
export { text } from "./hyperapp.js"
const EMPTY_ARR = []
const EMPTY_OBJ = {}
const tag =
  tag2 =>
  (
    props = EMPTY_OBJ,
    children = props.tag != null || Array.isArray(props) ? props : EMPTY_ARR
  ) =>
    h(tag2, props === children ? EMPTY_OBJ : props, children)
const a = tag("a")
const b = tag("b")
const i = tag("i")
const p = tag("p")
const q = tag("q")
const s = tag("s")
const br = tag("br")
const dd = tag("dd")
const dl = tag("dl")
const dt = tag("dt")
const em = tag("em")
const h1 = tag("h1")
const h2 = tag("h2")
const h3 = tag("h3")
const h4 = tag("h4")
const h5 = tag("h5")
const h6 = tag("h6")
const hr = tag("hr")
const li = tag("li")
const ol = tag("ol")
const rp = tag("rp")
const rt = tag("rt")
const td = tag("td")
const th = tag("th")
const tr = tag("tr")
const ul = tag("ul")
const bdi = tag("bdi")
const bdo = tag("bdo")
const col = tag("col")
const del = tag("del")
const dfn = tag("dfn")
const div = tag("div")
const img = tag("img")
const ins = tag("ins")
const kbd = tag("kbd")
const map = tag("map")
const nav = tag("nav")
const pre = tag("pre")
const rtc = tag("rtc")
const sub = tag("sub")
const sup = tag("sup")
const wbr = tag("wbr")
const abbr = tag("abbr")
const area = tag("area")
const cite = tag("cite")
const code = tag("code")
const data = tag("data")
const form = tag("form")
const main = tag("main")
const mark = tag("mark")
const ruby = tag("ruby")
const samp = tag("samp")
const span = tag("span")
const time = tag("time")
const aside = tag("aside")
const audio = tag("audio")
const input = tag("input")
const label = tag("label")
const meter = tag("meter")
const param = tag("param")
const small = tag("small")
const table = tag("table")
const tbody = tag("tbody")
const tfoot = tag("tfoot")
const thead = tag("thead")
const track = tag("track")
const video = tag("video")
const button = tag("button")
const canvas = tag("canvas")
const dialog = tag("dialog")
const figure = tag("figure")
const footer = tag("footer")
const header = tag("header")
const iframe = tag("iframe")
const legend = tag("legend")
const object = tag("object")
const option = tag("option")
const output = tag("output")
const select = tag("select")
const source = tag("source")
const strong = tag("strong")
const address = tag("address")
const article = tag("article")
const caption = tag("caption")
const details = tag("details")
const section = tag("section")
const summary = tag("summary")
const picture = tag("picture")
const colgroup = tag("colgroup")
const datalist = tag("datalist")
const fieldset = tag("fieldset")
const menuitem = tag("menuitem")
const optgroup = tag("optgroup")
const progress = tag("progress")
const textarea = tag("textarea")
const blockquote = tag("blockquote")
const figcaption = tag("figcaption")
export {
  a,
  abbr,
  address,
  area,
  article,
  aside,
  audio,
  b,
  bdi,
  bdo,
  blockquote,
  br,
  button,
  canvas,
  caption,
  cite,
  code,
  col,
  colgroup,
  data,
  datalist,
  dd,
  del,
  details,
  dfn,
  dialog,
  div,
  dl,
  dt,
  em,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  hr,
  i,
  iframe,
  img,
  input,
  ins,
  kbd,
  label,
  legend,
  li,
  main,
  map,
  mark,
  menuitem,
  meter,
  nav,
  object,
  ol,
  optgroup,
  option,
  output,
  p,
  param,
  picture,
  pre,
  progress,
  q,
  rp,
  rt,
  rtc,
  ruby,
  s,
  samp,
  section,
  select,
  small,
  source,
  span,
  strong,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  textarea,
  tfoot,
  th,
  thead,
  time,
  tr,
  track,
  ul,
  video,
  wbr,
}
export default null
