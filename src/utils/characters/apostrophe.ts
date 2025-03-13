import type { IsStringLiteral } from '../../internal/literals.js'
import { type ReplaceAll, replaceAll } from '../../native/replace-all.js'

type Apostrophe = "'"

/**
 * Checks if the given character is an apostrophe
 */
export type IsApostrophe<T extends string> = IsStringLiteral<T> extends true
  ? T extends Apostrophe
    ? true
    : false
  : boolean

export type RemoveApostrophe<T extends string> = ReplaceAll<T, "'", ''>

export function removeApostrophe<T extends string>(
  str: T
): RemoveApostrophe<T> {
  return replaceAll(str, "'", '')
}
