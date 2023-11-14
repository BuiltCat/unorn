import { UnoGenerator } from "./generator";
import { CountableSet } from "./utils";

export type Awaitable<T> = T | Promise<T>;
export type Arrayable<T> = T | T[];
export type ToArray<T> = T extends (infer U)[] ? U[] : T[];
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export type FlatObjectTuple<T> = { [k in keyof T]: T[k] };

export type RequiredByKey<T, K extends keyof T = keyof T> = FlatObjectTuple<
  Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>
>;

export type CSSObject = Record<string, string | number | undefined>;

export interface RuleContext<Theme extends object = object> {
  /**
   * Unprocessed selector from user input.
   * Useful for generating CSS rule.
   */
  rawSelector: string;
  /**
   * The theme object
   */
  theme: Theme
  /**
   * Current selector for rule matching
   */
  currentSelector: string;
  /**
   * UnoCSS generator instance
   */
  generator: UnoGenerator<Theme>;
}

export interface ExtractorContext {
  readonly original: string;
  code: string;
  id?: string;
  extracted: Set<string> | CountableSet<string>;
  envMode?: "dev" | "build";
}

export interface Extractor {
  name: string;
  order?: number;

  /**
   * Extract the code and return a list of selectors.
   *
   * Return `undefined` to skip this extractor.
   */
  extract?(
    ctx: ExtractorContext
  ):
    Set<string> | CountableSet<string> | string[] | undefined | void;
}

export interface RuleMeta {
  /**
   * The layer name of this rule.
   * @default 'default'
   */
  layer?: string;

  /**
   * Option to not merge this selector even if the body are same.
   * @default false
   */
  noMerge?: boolean;

  /**
   * Fine tune sort
   */
  sort?: number;

  /**
   * Templates to provide autocomplete suggestions
   */
  autocomplete?: Arrayable<AutoCompleteTemplate>;

  /**
   * Matching prefix before this util
   */
  prefix?: string | string[];

  /**
   * Internal rules will only be matched for shortcuts but not the user code.
   * @default false
   */
  internal?: boolean;

  /**
   * Store the hash of the rule boy
   *
   * @internal
   * @private
   */
  __hash?: string;
}

export type CSSValue = CSSObject;
export type DynamicMatcher<Theme extends object = object> = (
  match: RegExpMatchArray,
  context: Readonly<RuleContext<Theme>>
) => CSSValue | undefined;
export type DynamicRule<Theme extends object = object> =
  | [RegExp, DynamicMatcher<Theme>]
  | [RegExp, DynamicMatcher<Theme>, RuleMeta];
export type StaticRule =
  | [string, CSSObject]
  | [string, CSSObject, RuleMeta];
export type Rule<Theme extends object = object> =
  | DynamicRule<Theme>
  | StaticRule;

export interface ConfigBase<Theme extends object = object> {
  /**
   * Rules to generate CSS utilities.
   *
   * Later entries have higher priority.
   */
  rules?: Rule<Theme>[];

  /**
   * Theme object for shared configuration between rules
   */
  theme?: Theme

  /**
   * Extractors to handle the source file and outputs possible classes/selectors
   * Can be language-aware.
   */
  extractors?: Extractor[];
}

export interface USerOnlyOptions<Theme extends object = object> {
  /**
   * Environment mode
   *
   * @default 'build'
   */
  envMode?: "dev" | "build";
}

export interface UserConfig<Theme extends object = object>
  extends ConfigBase<Theme>,
  USerOnlyOptions<Theme> { }
export interface UserConfigDefaults<Theme extends object = object>
  extends ConfigBase<Theme>,
  USerOnlyOptions<Theme> { }

export interface ResolvedConfig<Theme extends object = object>
  extends Omit<
    RequiredByKey<UserConfig<Theme>, "theme" | "rules" | "extractors">,
    "rules"
  > {
  rulesSize: number;
  rulesDynamic: [number, ...DynamicRule<Theme>][];
  rulesStaticMap: Record<
    string,
    | [number, CSSObject, RuleMeta | undefined, Rule<Theme>]
    | undefined
  >;
}

export type AutoCompleteTemplate = string;


export type ParsedUtil<Theme extends object = object> = readonly [
  index: number,
  selector: string | undefined,
  body: CSSObject,
  meta: RuleMeta | undefined,
  context: RuleContext<Theme> | undefined,
];


export interface GenerateResult<T = Set<string>> { }

export interface GenerateOptions<T extends boolean> {
  /**
   * Filepath of the file being processed.
   */
  id?: string;
}
