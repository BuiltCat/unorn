import type { FlexStyle, ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type { UnoGenerator } from './generator'
import type { CountableSet } from './utils'

export type Awaitable<T> = T | Promise<T>
export type Arrayable<T> = T | T[]
export type ToArray<T> = T extends (infer U)[] ? U[] : T[]
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export type FlatObjectTuple<T> = { [k in keyof T]: T[k] }

export type RequiredByKey<T, K extends keyof T = keyof T> = FlatObjectTuple<
  Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>
>

export type CSSObject = ViewStyle | TextStyle | ImageStyle
export interface RuleContext<Theme extends object = object> {
  /**
   * Unprocessed selector from user input.
   * Useful for generating CSS rule.
   */
  rawSelector: string
  /**
   * The theme object
   */
  theme: Theme
  /**
   * Current selector for rule matching
   */
  currentSelector: string
  /**
   * UnoCSS generator instance
   */
  generator: UnoGenerator<Theme>
  /**
   * Matched variants handlers for this rule.
   */
  variantHandlers: VariantHandler[]
  /**
   * The result of variant matching.
   */
  variantMatch: VariantMatchedResult<Theme>
}

export interface VariantContext<Theme extends object = object> {
  /**
   * Unprocessed selector from user input.
   */
  rawSelector: string
  /**
   * UnoCSS generator instance
   */
  generator: UnoGenerator<Theme>
  /**
   * The theme object
   */
  theme: Theme
}

export interface ExtractorContext {
  readonly original: string
  code: string
  id?: string
  extracted: Set<string> | CountableSet<string>
  envMode?: 'dev' | 'build'
}

export interface Extractor {
  name: string
  order?: number

  /**
   * Extract the code and return a list of selectors.
   *
   * Return `undefined` to skip this extractor.
   */
  extract?(
    ctx: ExtractorContext
  ):
    Set<string> | CountableSet<string> | string[] | undefined | void
}

export interface RuleMeta {
  /**
   * The layer name of this rule.
   * @default 'default'
   */
  layer?: string

  /**
   * Option to not merge this selector even if the body are same.
   * @default false
   */
  noMerge?: boolean

  /**
   * Fine tune sort
   */
  sort?: number

  /**
   * Templates to provide autocomplete suggestions
   */
  autocomplete?: Arrayable<AutoCompleteTemplate>

  /**
   * Matching prefix before this util
   */
  prefix?: string | string[]

  /**
   * Internal rules will only be matched for shortcuts but not the user code.
   * @default false
   */
  internal?: boolean

  /**
   * Store the hash of the rule boy
   *
   * @internal
   * @private
   */
  __hash?: string
}

export type DynamicMatcher<Theme extends object = object> = (
  match: RegExpMatchArray,
  context: Readonly<RuleContext<Theme>>
) => CSSObject | undefined
export type DynamicRule<Theme extends object = object> =
  | [RegExp, DynamicMatcher<Theme>]
  | [RegExp, DynamicMatcher<Theme>, RuleMeta]
export type StaticRule =
  | [string, CSSObject]
  | [string, CSSObject, RuleMeta]
export type Rule<Theme extends object = object> =
  | DynamicRule<Theme>
  | StaticRule

export interface VariantHandlerContext {
  /**
   * Rewrite the output selector. Often be used to append parents.
   */
  // prefix: string
  /**
   * Rewrite the output selector. Often be used to append pseudo classes.
   */
  selector: string
  /**
   * Rewrite the output selector. Often be used to append pseudo elements.
   */
  // pseudo: string
  /**
   * Rewrite the output css body. The input come in [key,value][] pairs.
   */
  entries: CSSObject
  /**
   * Provide a parent selector(e.g. media query) to the output css.
   */
  parent?: string
  /**
   * Provide order to the `parent` parent selector within layer.
   */
  parentOrder?: number
  /**
   * Override layer to the output css.
   */
  layer?: string
  /**
   * Order in which the variant is sorted within single rule.
   */
  sort?: number
  /**
   * Option to not merge the resulting entries even if the body are the same.
   * @default false
   */
  noMerge?: boolean
}

export interface VariantHandler {
  /**
   * Callback to process the handler.
   */
  handle?: (input: VariantHandlerContext, next: (input: VariantHandlerContext) => VariantHandlerContext) => VariantHandlerContext
  /**
   * The result rewritten selector for the next round of matching
   */
  matcher: string
  /**
   * Order in which the variant is applied to selector.
   */
  order?: number
  /**
   * Rewrite the output selector. Often be used to append pseudo classes or parents.
   */
  selector?: (input: string, body: CSSObject) => string | undefined
  /**
   * Rewrite the output css body. The input come in [key,value][] pairs.
   */
  body?: (body: CSSObject) => CSSObject | undefined
  /**
   * Provide a parent selector(e.g. media query) to the output css.
   */
  parent?: string | [string, number] | undefined
  /**
   * Order in which the variant is sorted within single rule.
   */
  sort?: number
  /**
   * Override layer to the output css.
   */
  layer?: string | undefined
}

export type VariantFunction<Theme extends object = object> = (matcher: string, context: Readonly<VariantContext<Theme>>) => Awaitable<string | VariantHandler | undefined>

export interface VariantObject<Theme extends object = object> {
  /**
   * The name of the variant.
   */
  name?: string
  /**
   * The entry function to match and rewrite the selector for further processing.
   */
  match: VariantFunction<Theme>
  /**
   * Sort for when the match is applied.
   */
  order?: number

  /**
   * Allows this variant to be used more than once in matching a single rule
   *
   * @default false
   */
  multiPass?: boolean

  /**
   * Custom function for auto complete
   */
  // autocomplete?: Arrayable<AutoCompleteFunction | AutoCompleteTemplate>
}

export type Variant<Theme extends object = object> = VariantFunction<Theme> | VariantObject<Theme>

export interface ConfigBase<Theme extends object = object> {
  /**
   * Rules to generate CSS utilities.
   *
   * Later entries have higher priority.
   */
  rules?: Rule<Theme>[]

  /**
   * Variant separator
   *
   * @default [':', '-']
   */
  separators?: Arrayable<string>

  /**
   * Variants that preprocess the selectors,
   * having the ability to rewrite the CSS object.
   */
  variants?: Variant<Theme>[]

  /**
   * Theme object for shared configuration between rules
   */
  theme?: Theme

  /**
   * Extractors to handle the source file and outputs possible classes/selectors
   * Can be language-aware.
   */
  extractors?: Extractor[]
}

export interface USerOnlyOptions<Theme extends object = object> {
  /**
   * The theme object, will be merged with the theme provides by presets
   */
  theme?: Theme
  /**
   * Environment mode
   *
   * @default 'build'
   */
  envMode?: 'dev' | 'build'
}

export interface UserConfig<Theme extends object = object>
  extends ConfigBase<Theme>,
  USerOnlyOptions<Theme> { }
export interface UserConfigDefaults<Theme extends object = object>
  extends ConfigBase<Theme>,
  USerOnlyOptions<Theme> { }

export interface ResolvedConfig<Theme extends object = object>
  extends Omit<
    RequiredByKey<UserConfig<Theme>, 'theme' | 'variants' | 'rules' | 'extractors'>,
    'rules'
  > {
  variants: VariantObject<Theme>[]
  rulesSize: number
  rulesDynamic: [number, ...DynamicRule<Theme>][]
  rulesStaticMap: Record<
    string,
    | [number, CSSObject, RuleMeta | undefined, Rule<Theme>]
    | undefined
  >
}

export type AutoCompleteTemplate = string

export type VariantMatchedResult<Theme extends object = object> = readonly [
  raw: string,
  current: string,
  variantHandlers: VariantHandler[],
  variants: Set<Variant<Theme>>,
]

export type ParsedUtil = readonly [
  index: number,
  selector: string,
  body: CSSObject,
  meta: RuleMeta | undefined,
  variantHandlers: VariantHandler[],
]

export type StyleUtil<Theme extends object = object> = readonly [
  index: number,
  selector: string,
  body: CSSObject,
  meta: RuleMeta | undefined,
  context: RuleContext<Theme> | undefined,
  noMerge: boolean | undefined,
]

export interface UtilObject {
  selector: string
  entries: CSSObject
  // parent: string | undefined
  // layer: string | undefined
  sort: number | undefined
  noMerge: boolean | undefined
}

export interface GenerateResult<T = Set<string>> { }

export interface GenerateOptions<T extends boolean> {
  /**
   * Filepath of the file being processed.
   */
  id?: string
}
