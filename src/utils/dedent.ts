import type { Join } from '../index.js'

/** Default indent type values. */
type IndentTypes = ' ' | '\t'

/**
 * Removes leading and trailing new lines from a string.
 * - Str: The string to trim.
 */
type TrimNewLines<
  Str extends string
> = Str extends `\n${infer Content}`
  ? TrimNewLines<Content>
  : Str extends `${infer Content}\n`
  ? TrimNewLines<Content>
  : Str

/**
 * Removes leading and trailing new lines from a string.
 *
 * @param str The string to trim.
 * @returns The trimmed string.
 */
function trimNewLines<Str extends string>(str: Str) {
  while (str.startsWith('\n')) {
    str = str.slice(1) as Str
  }

  while (str.endsWith('\n')) {
    str = str.slice(0, -1) as Str
  }

  return str as TrimNewLines<Str>
}

type GetIndentation<
  Str extends string,
  Indentation extends IndentTypes[] = []
> = Str extends `${infer Ind extends IndentTypes}${infer Content}`
  ? GetIndentation<Content, [Ind, ...Indentation]>
  : Join<Indentation>

/**
 * Gets the type of indentation from a string.
 *
 * @param str The string to get the indentation from.
 * @param ind Optional indentation to use.
 * @returns The indentation.
 */
function getIndentation<
  Str extends string,
  Indentation  = GetIndentation<Str>
>(str: Str, ind?: Indentation) {
  if (ind) return ind

  return str.match(/^(\s*)/)![0] as Indentation
}

/**
 * Replaces the indentation in a string.
 *
 * - Str: The string to replace the indentation of.
 * - Indentation: The indentation to use.
 */
type ReplaceIndentation<
  Str extends string[],
  Indentation extends string
> = Str extends [infer First, ...infer Rest extends string[]]
  ? First extends `${Indentation}${infer Content}`
    ? [Content, ...ReplaceIndentation<Rest, Indentation>]
    : [First, ...ReplaceIndentation<Rest, Indentation>]
  : Str

/**
 * Replaces the indentation in a string.
 *
 * @param str The string array to replace the indentations of.
 * @param ind The indentation to use.
 * @returns The string array with the indentations replaced.
 */
function replaceIndentation<
  Str extends string[],
  Indentation extends string
>(str: Str, ind: Indentation) {
  return str.map((line) => line.replace(ind, '')) as ReplaceIndentation<Str, Indentation>
}

type Split<
  Str extends string,
  Accumulator extends string[] = []
> = Str extends `${infer First}\n${infer Rest}`
  ? Split<Rest, [...Accumulator, First]>
  : [...Accumulator, Str]

/**
 * Removes indentation from a string.
 * - Str: The string to dedent.
 * - Indentation?: Optionally specify the indentation.
 */
export type Dedent<
  Str extends string,
  Trimmed extends string = TrimNewLines<Str>,
  Indentation extends string = GetIndentation<Trimmed>
> = Join<ReplaceIndentation<Split<Trimmed>, Indentation>, '\n'>

/**
 * Removes indentation from a string.
 *
 * @param str A string to dedent.
 * @returns The dedented string.
 */
export function dedent<
  Str extends string,
  Indentation extends string = GetIndentation<Str>
>(str: Str, ind?: Indentation) {
  str = trimNewLines(str) as Str
  ind ??= getIndentation(str) as Indentation

  str = replaceIndentation(str.split('\n'), ind).join('\n') as Str

  return str as Dedent<Str>
}
