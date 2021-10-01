declare module "@hyperapp/svg" {
  import { ElementVNode, MaybeVNode, Props, CustomPayloads } from "hyperapp"

  export type Content<S> = MaybeVNode<S>[] | MaybeVNode<S>

  type TagFn = <S, X>(
    props: (CustomPayloads<S, X> & Props<S>) | Content<S>,
    content?: Content<S>
  ) => ElementVNode<S>

  export const a: TagFn
  export const g: TagFn
  export const svg: TagFn
  export const use: TagFn
  export const set: TagFn
  export const line: TagFn
  export const path: TagFn
  export const rect: TagFn
  export const desc: TagFn
  export const defs: TagFn
  export const mask: TagFn
  export const tref: TagFn
  export const font: TagFn
  export const stop: TagFn
  export const view: TagFn
  export const text_: TagFn
  export const image: TagFn
  export const mpath: TagFn
  export const title: TagFn
  export const glyph: TagFn
  export const tspan: TagFn
  export const style: TagFn
  export const circle: TagFn
  export const marker: TagFn
  export const symbol: TagFn
  export const feTile: TagFn
  export const cursor: TagFn
  export const filter: TagFn
  export const switch_: TagFn
  export const ellipse: TagFn
  export const polygon: TagFn
  export const animate: TagFn
  export const pattern: TagFn
  export const feBlend: TagFn
  export const feFlood: TagFn
  export const feFuncA: TagFn
  export const feFuncB: TagFn
  export const feFuncG: TagFn
  export const feFuncR: TagFn
  export const feImage: TagFn
  export const feMerge: TagFn
  export const polyline: TagFn
  export const metadata: TagFn
  export const altGlyph: TagFn
  export const glyphRef: TagFn
  export const textPath: TagFn
  export const feOffset: TagFn
  export const clipPath: TagFn
  export const altGlyphDef: TagFn
  export const feComposite: TagFn
  export const feMergeNode: TagFn
  export const feSpotLight: TagFn
  export const animateColor: TagFn
  export const altGlyphItem: TagFn
  export const feMorphology: TagFn
  export const feTurbulence: TagFn
  export const fePointLight: TagFn
  export const colorProfile: TagFn
  export const foreignObject: TagFn
  export const animateMotion: TagFn
  export const feColorMatrix: TagFn
  export const linearGradient: TagFn
  export const radialGradient: TagFn
  export const feGaussianBlur: TagFn
  export const feDistantLight: TagFn
  export const animateTransform: TagFn
  export const feConvolveMatrix: TagFn
  export const feDiffuseLighting: TagFn
  export const feDisplacementMap: TagFn
  export const feSpecularLighting: TagFn
  export const feComponentTransfer: TagFn
}
