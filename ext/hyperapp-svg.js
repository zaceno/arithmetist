import { h } from "./hyperapp.js"
const EMPTY_ARR = []
const EMPTY_OBJ = {}
const tag =
  tag2 =>
  (
    props,
    children = props.tag != null || Array.isArray(props) ? props : EMPTY_ARR
  ) =>
    h(tag2, props === children ? EMPTY_OBJ : props, children)
const a = tag("a")
const g = tag("g")
const svg = tag("svg")
const use = tag("use")
const set = tag("set")
const line = tag("line")
const path = tag("path")
const rect = tag("rect")
const desc = tag("desc")
const defs = tag("defs")
const mask = tag("mask")
const tref = tag("tref")
const font = tag("font")
const stop = tag("stop")
const view = tag("view")
const text_ = tag("text")
const image = tag("image")
const mpath = tag("mpath")
const title = tag("title")
const glyph = tag("glyph")
const tspan = tag("tspan")
const style = tag("style")
const circle = tag("circle")
const marker = tag("marker")
const symbol = tag("symbol")
const feTile = tag("feTile")
const cursor = tag("cursor")
const filter = tag("filter")
const switch_ = tag("switch")
const ellipse = tag("ellipse")
const polygon = tag("polygon")
const animate = tag("animate")
const pattern = tag("pattern")
const feBlend = tag("feBlend")
const feFlood = tag("feFlood")
const feFuncA = tag("feFuncA")
const feFuncB = tag("feFuncB")
const feFuncG = tag("feFuncG")
const feFuncR = tag("feFuncR")
const feImage = tag("feImage")
const feMerge = tag("feMerge")
const polyline = tag("polyline")
const metadata = tag("metadata")
const altGlyph = tag("altGlyph")
const glyphRef = tag("glyphRef")
const textPath = tag("textPath")
const feOffset = tag("feOffset")
const clipPath = tag("clipPath")
const altGlyphDef = tag("altGlyphDef")
const feComposite = tag("feComposite")
const feMergeNode = tag("feMergeNode")
const feSpotLight = tag("feSpotLight")
const animateColor = tag("animateColor")
const altGlyphItem = tag("altGlyphItem")
const feMorphology = tag("feMorphology")
const feTurbulence = tag("feTurbulence")
const fePointLight = tag("fePointLight")
const colorProfile = tag("colorProfile")
const foreignObject = tag("foreignObject")
const animateMotion = tag("animateMotion")
const feColorMatrix = tag("feColorMatrix")
const linearGradient = tag("linearGradient")
const radialGradient = tag("radialGradient")
const feGaussianBlur = tag("feGaussianBlur")
const feDistantLight = tag("feDistantLight")
const animateTransform = tag("animateTransform")
const feConvolveMatrix = tag("feConvolveMatrix")
const feDiffuseLighting = tag("feDiffuseLighting")
const feDisplacementMap = tag("feDisplacementMap")
const feSpecularLighting = tag("feSpecularLighting")
const feComponentTransfer = tag("feComponentTransfer")
export {
  a,
  altGlyph,
  altGlyphDef,
  altGlyphItem,
  animate,
  animateColor,
  animateMotion,
  animateTransform,
  circle,
  clipPath,
  colorProfile,
  cursor,
  defs,
  desc,
  ellipse,
  feBlend,
  feColorMatrix,
  feComponentTransfer,
  feComposite,
  feConvolveMatrix,
  feDiffuseLighting,
  feDisplacementMap,
  feDistantLight,
  feFlood,
  feFuncA,
  feFuncB,
  feFuncG,
  feFuncR,
  feGaussianBlur,
  feImage,
  feMerge,
  feMergeNode,
  feMorphology,
  feOffset,
  fePointLight,
  feSpecularLighting,
  feSpotLight,
  feTile,
  feTurbulence,
  filter,
  font,
  foreignObject,
  g,
  glyph,
  glyphRef,
  image,
  line,
  linearGradient,
  marker,
  mask,
  metadata,
  mpath,
  path,
  pattern,
  polygon,
  polyline,
  radialGradient,
  rect,
  set,
  stop,
  style,
  svg,
  switch_,
  symbol,
  textPath,
  text_,
  title,
  tref,
  tspan,
  use,
  view,
}
export default null
