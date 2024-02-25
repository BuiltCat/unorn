import { type CSSObject, type DynamicMatcher, type RuleContext, isString } from '@unorn/core'
import type { Theme } from '../theme'
import { h } from './handlers'
import { hexToRGB } from './colors'

export const bracketTypeRe = /^\[(color|length|position|quoted|string):/i

type ThemeColorKeys = 'backgroundColor' | 'colors' | 'textColor' | 'borderColor'

export function getStringComponent(str: string, open: string, close: string, separators: string | string[]) {
  if (str === '')
    return

  if (isString(separators))
    separators = [separators]

  const l = str.length

  let parenthesis = 0
  for (let i = 0; i < l; i++) {
    switch (str[i]) {
      case open:
        parenthesis++
        break
      case close:
        if (--parenthesis < 0)
          return
        break

      default:
        for (const separator of separators) {
          const separatorLength = separator.length
          if (separatorLength && separator === str.slice(i, i + separatorLength) && parenthesis === 0) {
            if (i === 0 || i === l - separatorLength)
              return
            return [
              str.slice(0, i),
              str.slice(i + separatorLength),
            ]
          }
        }
    }
  }

  return [
    str,
    '',
  ]
}

function getThemeColorForKey(theme: Theme, colors: string[], key: ThemeColorKeys = 'colors') {
  let obj = theme[key] as Theme['colors'] | string
  let index = -1

  for (const c of colors) {
    index += 1
    if (obj && typeof obj !== 'string') {
      const camel = colors.slice(index).join('-').replace(/(-[a-z])/g, n => n.slice(1).toUpperCase())
      if (obj[camel])
        return obj[camel]

      if (obj[c]) {
        obj = obj[c]
        continue
      }
    }
    return undefined
  }
  return obj
}

function getThemeColor(theme: Theme, colors: string[], key?: ThemeColorKeys) {
  return getThemeColorForKey(theme, colors, key) || getThemeColorForKey(theme, colors, 'colors')
}

export function hasParseableColor(color: string | undefined, theme: Theme, key: ThemeColorKeys) {
  return color != null && !!parseColor(color, theme, key)?.color
}

export function splitShorthand(body: string, type: string) {
  const [front, rest] = getStringComponent(body, '[', ']', ['/']) ?? []
  if (front != null) {
    const match = (front.match(bracketTypeRe) ?? [])[1]

    if (match == null || match === type)
      return [front, rest]
  }
}

/**
 * Parse color string into {@link ParsedColorValue} (if possible). Color value will first be matched to theme object before parsing.
 * See also color.tests.ts for more examples.
 *
 * @example Parseable strings:
 * 'red' // From theme, if 'red' is available
 * 'red-100' // From theme, plus scale
 * 'red-100/20' // From theme, plus scale/opacity
 * ''[rgb(100 2 3)]/[var(--op)]'' // Bracket with rgb color and bracket with opacity
 *
 * @param body - Color string to be parsed.
 * @param theme - {@link Theme} object.
 * @return object if string is parseable.
 */
export function parseColor(body: string, theme: Theme, key?: ThemeColorKeys) {
  const split = splitShorthand(body, 'color')

  if (!split)
    return
  const [main, opacity] = split

  const colors = main.replace(/([a-z])([0-9])/g, '$1-$2').split(/-/g)
  const [name] = colors

  if (!name)
    return

  let color

  const bracket = h.bracket(main)
  const bracketOrMain = bracket || main

  if (typeof bracketOrMain !== 'string')
    return

  if (/^#[\da-fA-F]+/.test(bracketOrMain))
    color = bracketOrMain

  color = color || bracket

  if (!color) {
    const colorData = getThemeColor(theme, [main], key)
    if (typeof colorData === 'string')
      color = colorData
  }

  let no = 'DEFAULT'
  if (!color) {
    let colorData
    const [scale] = colors.slice(-1)
    if (/^\d+$/.test(scale)) {
      no = scale
      colorData = getThemeColor(theme, colors.slice(0, -1), key)
      if (!colorData || typeof colorData === 'string')
        color = undefined
      else
        color = colorData[no] as string
    }
    else {
      colorData = getThemeColor(theme, colors, key)
      if (!colorData && colors.length <= 2) {
        [, no = no] = colors
        colorData = getThemeColor(theme, [name], key)
      }
      if (typeof colorData === 'string')
        color = colorData
      else if (no && colorData)
        color = colorData[no] as string
    }
  }

  return {
    color,
    alpha: h.bracket.percent(opacity ?? ''),
  }
}

/**
 * @example Resolving 'red' from theme:
 * colorResolver('background-color', 'background')('', 'red')
 * return { 'background-color': '#f12' }
 *
 * @param property
 */
export function colorResolver(property:
  'backgroundColor' |
  'color' |
  'borderBottomColor' |
  'borderColor' |
  'borderEndColor' |
  'borderLeftColor' |
  'borderRightColor' |
  'borderStartColor' |
  'borderTopColor', key?: ThemeColorKeys): DynamicMatcher<Theme> {
  return ([, body]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined => {
    // 处理 16 进制 和 rgba rgb hsl hsla hwb
    // 1. red =>  找到对应 theme 中的 red 没有就不添加
    // 2. red-100 => 找到对应 theme 中的 red { 100 } 如果没有 就不添加
    // 3. red-100/20 => 找到 theme 中的 red { 100 } 并添加 20/100的透明度 没有同上
    // 4. very-cool => 找到 theme 中的 very { cool } 并添加 没有同上
    // 5. red-[rgba|rgb|hsl|hsla|hwb] => 直接提取[]中的颜色并添加

    const data = parseColor(body, theme, key)
    if (!data)
      return
    const { alpha, color } = data

    const tColor = transformColor(alpha, color)

    return {
      [property]: tColor ?? color,
    }
  }
}

export function transformColor(alpha: string | number | undefined, color: string | number | undefined) {
  if (alpha) {
    if (/^#[(0-9|a-f)]+$/.test(color)) {
      const rgb = hexToRGB(color)
      return `rgba(${rgb.join(',')},${alpha})`
    }
  }
  return color
}
