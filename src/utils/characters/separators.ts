import type { IsStringLiteral } from '../../internal/literals.js'

const UNESCAPED_SEPARATORS = [
  '[',
  ']',
  '{',
  '}',
  '(',
  ')',
  '|',
  '/',
  '-',
  '\\',
] as const
const SEPARATORS = [...UNESCAPED_SEPARATORS, ' ', '_', '.'] as const

/** Escape characters with special significance in regular expressions */
function escapeChar(char: string): string {
  return (UNESCAPED_SEPARATORS as readonly string[]).includes(char)
    ? `\\${char}`
    : char
}

export const SEPARATOR_REGEX = new RegExp(
  `[${SEPARATORS.map(escapeChar).join('')}]`,
  'g'
)

export type Separator = (typeof SEPARATORS)[number]

/**
 * Checks if the given character is a separator.
 * E.g. space, underscore, dash, dot, slash.
 */
export type IsSeparator<T extends string> = IsStringLiteral<T> extends true
  ? T extends Separator
    ? true
    : false
  : boolean
