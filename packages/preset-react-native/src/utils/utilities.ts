import type { CSSObject, DynamicMatcher, RuleContext } from '@unocss-native/core'
import type { Theme } from '../theme'

/**
 * Parse color string into {@link ParsedColorValue} (if possible). Color value will first be matched to theme object before parsing.
 * See also color.tests.ts for more examples.
 *
 * @example Parseable strings:
 * 'red' // From theme, if 'red' is available
 * 'red-100' // From theme, plus scale
 * 'red-100/20' // From theme, plus scale/opacity
 * ''[rgb(100,2,3)]/[var(--op)]'' // Bracket with rgb color and bracket with opacity
 *
 * @param body - Color string to be parsed.
 * @param theme - {@link Theme} object.
 * @return object if string is parseable.
 */
export function parseColor(body: string, theme: Theme) {
  const [main, opacity] = splitShorthand(body, 'color')

  const colors = main.replace(/([a-z])([0-9])/g, '$1-$2').split(/-/g)
  const [name] = colors

  if (!name)
    return

  let color: string | undefined

  // const bracket = h.
}

// 处理 16 进制 和 rgba rgb hsl hsla hwb
// 1. red =>  找到对应 theme 中的 red 没有就不添加
// 2. red-100 => 找到对应 theme 中的 red { 100 } 如果没有 就不添加
// 3. red-100/20 => 找到 theme 中的 red { 100 } 并添加 20/100的透明度 没有同上
// 4. very-cool => 找到 theme 中的 very { cool } 并添加 没有同上
// 5. very-cool-100/20 => 找到 theme 中 veryCool { 100 } 并添加 20 的透明度
// 6. red-[rgba|rgb|hsl|hsla|hwb] => 直接提取[]中的颜色并添加
/**
 *
 *
 * @example Resolving 'red' from theme:
 * colorResolver('background-color', 'background')('', 'red')
 * return { 'background-color': '#f12' }
 *
 * @param property
 * @param shouldPass
 * @returns
 */
export function colorResolver(property: string, shouldPass?: (css: CSSObject) => boolean): DynamicMatcher<Theme> {
  return ([, body]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined => {
    // 处理 16 进制 和 rgba rgb hsl hsla hwb
    // 1. red =>  找到对应 theme 中的 red 没有就不添加
    // 2. red-100 => 找到对应 theme 中的 red { 100 } 如果没有 就不添加
    // 3. red-100/20 => 找到 theme 中的 red { 100 } 并添加 20/100的透明度 没有同上
    // 4. very-cool => 找到 theme 中的 very { cool } 并添加 没有同上
    // 5. red-[rgba|rgb|hsl|hsla|hwb] => 直接提取[]中的颜色并添加
    const values = body.split(/-/g)

    const themeColor = theme.colors

    const camel = body.replace(/(-[a-z])/g, n => n.slice(1).toUpperCase())

    if (theme.colors[camel]) {
      return {
        backgroundColor: theme.colors[camel],
      }
    }

    if (!data)
      return

    const { alpha, color, cssColor } = data
    const css: CSSObject = {}
    if (cssColor) {
      if (alpha != null)
        css[property] = colorToString(cssColor, alpha)

      else
        css[property] = colorToString(cssColor, colorOpacityToString(cssColor))
    }
    else if (color) {
      css[property] = colorToString(color, alpha)
    }

    if (shouldPass?.(css) !== false)
      return css
  }
}
