import type { Rule, RuleContext } from '@unorn/core'
import type { Theme } from '../theme'
import { h } from '../utils/handlers'
import { directions } from '../utils/mappings'

function handleFlexShrink([, d = '']: string[], { theme }: RuleContext<Theme>) {
  const v = theme.extend?.flexShrink?.[d] ?? h.bracket.auto.fraction.number(d) ?? 1
  return {
    flexShrink: v,
  }
}

function handleFlexBasis([, d = '']: string[], { theme }: RuleContext<Theme>) {
  const v = theme.extend?.flexBasis?.[d] ?? theme?.spacing?.[d] ?? h.bracket.auto.fraction.number(d)
  return {
    flexBasis: v,
  }
}

function handleFlexGrow([, d = '']: string[], { theme }: RuleContext<Theme>) {
  const v = theme.extend?.flexGrow?.[d] ?? h.bracket.auto.fraction.number(d) ?? 1
  return {
    flexGrow: v,
  }
}

function handleGap([, d = '', s]: string[], { theme }: RuleContext<Theme>) {
  const v = theme.extend?.gap?.[s] ?? theme.spacing?.[s] ?? h.bracket.number(s)
  if (v != null) {
    return {
      [`${directions[d]}gap`.replace(/-(\w)/g, (_, p) => p.toUpperCase())]: v,
    }
  }
}

export const flex: Rule<Theme>[] = [

  // flexDirection
  ['flex-row', { flexDirection: 'row' }],
  ['flex-row-reverse', { flexDirection: 'row-reverse' }],
  ['flex-col', { flexDirection: 'column' }],
  ['flex-col-reverse', { flexDirection: 'column-reverse' }],

  // flexWrap
  ['flex-wrap', { flexWrap: 'wrap' }],
  ['flex-wrap-reverse', { flexWrap: 'wrap-reverse' }],
  ['flex-nowrap', { flexWrap: 'nowrap' }],

  // flexBasis flexGrow flexShrink
  [/^shrink(?:-(.*))?$/, handleFlexShrink],
  [/^grow(?:-(.*))?$/, handleFlexGrow],
  [/^basis-(.+)$/, handleFlexBasis],

  // justifyContent
  ['justify-start', { justifyContent: 'flex-start' }],
  ['justify-end', { justifyContent: 'flex-end' }],
  ['justify-center', { justifyContent: 'center' }],
  ['justify-between', { justifyContent: 'space-between' }],
  ['justify-around', { justifyContent: 'space-around' }],
  ['justify-evenly', { justifyContent: 'space-evenly' }],

  // alignContent
  ['content-center', { alignContent: 'center' }],
  ['content-start', { alignContent: 'flex-start' }],
  ['content-end', { alignContent: 'flex-end' }],
  ['content-between', { alignContent: 'space-between' }],
  ['content-around', { alignContent: 'space-around' }],
  ['content-stretch', { alignContent: 'stretch' }],

  // alignItems
  ['items-start', { alignItems: 'flex-start' }],
  ['items-end', { alignItems: 'flex-end' }],
  ['items-center', { alignItems: 'center' }],
  ['items-baseline', { alignItems: 'baseline' }],
  ['items-stretch', { alignItems: 'stretch' }],

  // alignSelf
  ['self-auto', { alignSelf: 'auto' }],
  ['self-start', { alignSelf: 'flex-start' }],
  ['self-end', { alignSelf: 'flex-end' }],
  ['self-center', { alignSelf: 'center' }],
  ['self-stretch', { alignSelf: 'stretch' }],
  ['self-baseline', { alignSelf: 'baseline' }],

  // gap columnGap rowGap
  [/^gap-?()(.+)$/, handleGap],
  [/^gap-([xy])-?(.+)$/, handleGap],
  [/^gap-(col|row)-?(.+)$/, handleGap],
]
