import { CSSObject, DynamicMatcher, RuleContext } from '@unocss/core'
import { colorToString, parseColor, colorOpacityToString  } from '@unocss/preset-mini/utils'
import { Theme } from '../theme'

/**
 * Provide {@link DynamicMatcher} function to produce color value matched from rule.
 *
 * @see {@link parseColor}
 *
 * @example Resolving 'red' from theme:
 * colorResolver('background-color', 'background')('', 'red')
 * return { 'background-color': '#f12' }
 *
 * @example Resolving 'red-100' from theme:
 * colorResolver('background-color', 'background')('', 'red-100')
 * return { '--un-background-opacity': '1', 'background-color': 'rgba(254,226,226,var(--un-background-opacity))' }
 *
 * @example Resolving 'red-100/20' from theme:
 * colorResolver('background-color', 'background')('', 'red-100/20')
 * return { 'background-color': 'rgba(204,251,241,0.22)' }
 *
 * @example Resolving 'hex-124':
 * colorResolver('color', 'text')('', 'hex-124')
 * return { '--un-text-opacity': '1', 'color': 'rgba(17,34,68,var(--un-text-opacity))' }
 *
 * @param {string} property - Property for the css value to be created.
 * @param {function} [shouldPass] - Function to decide whether to pass the css.
 * @return {@link DynamicMatcher} object.
 */
export function colorResolver(property: string, shouldPass?: (css: CSSObject) => boolean): DynamicMatcher<Theme> {
    return ([, body]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined => {
      const data = parseColor(body, theme)
  
      if (!data)
        return
  
      const { alpha, color, cssColor } = data
      const css: CSSObject = {}
      if (cssColor) {
        if (alpha != null) {
          css[property] = colorToString(cssColor, alpha)
        }
        else {
          css[property] = colorToString(cssColor, colorOpacityToString(cssColor))
        }
      }
      else if (color) {
        css[property] = colorToString(color, alpha)
      }
  
      if (shouldPass?.(css) !== false)
        return css
    }
  }