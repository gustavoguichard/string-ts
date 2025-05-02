import type { CharAt } from './char-at.ts'
import type { Concat } from './concat.ts'
import type { EndsWith } from './ends-with.ts'
import type { Includes } from './includes.ts'
import type { Join } from './join.ts'
import type { PadEnd } from './pad-end.ts'
import type { PadStart } from './pad-start.ts'
import type { Repeat } from './repeat.ts'
import type { ReplaceAll } from './replace-all.ts'
import type { Replace } from './replace.ts'
import type { Slice } from './slice.ts'
import type { Split } from './split.ts'
import type { StartsWith } from './starts-with.ts'
import type { TrimEnd } from './trim-end.ts'
import type { TrimStart } from './trim-start.ts'
import type { Trim } from './trim.ts'

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {}

declare global {
  interface ReadonlyArray<T> {
    join<const A extends readonly string[], D extends string = ''>(
      this: A,
      separator?: D
    ): Join<A, D>
  }

  interface String {
    charAt<const S extends string, I extends number>(
      this: S,
      index: I
    ): CharAt<S, I>

    concat<const S extends string, const T extends readonly string[]>(
      this: S,
      ...args: T
    ): Concat<[S, ...T]>

    endsWith<
      const S extends string,
      const T extends string,
      P extends number | undefined = undefined,
    >(this: S, searchString: T, index?: P): EndsWith<S, T, P>

    includes<
      const S extends string,
      const T extends string,
      P extends number = 0,
    >(this: S, searchString: T, position?: P): Includes<S, T, P>

    padEnd<
      const S extends string,
      const T extends number,
      const U extends string = ' ',
    >(this: S, maxLength: T, fillString?: U): PadEnd<S, T, U>

    padStart<
      const S extends string,
      const T extends number,
      const U extends string = ' ',
    >(this: S, maxLength: T, fillString?: U): PadStart<S, T, U>

    repeat<const S extends string, const T extends number>(
      this: S,
      count: T
    ): Repeat<S, T>

    replace<
      const S extends string,
      const T extends string,
      const U extends string,
    >(this: S, searchValue: T, replaceValue: U): Replace<S, T, U>

    replaceAll<
      const S extends string,
      const T extends string,
      const U extends string,
    >(this: S, searchValue: T, replaceValue: U): ReplaceAll<S, T, U>

    slice<const S extends string>(this: S): Slice<S>

    slice<const S extends string, const T extends number>(
      this: S,
      start?: T
    ): Slice<S, T>

    slice<
      const S extends string,
      const T extends number,
      const U extends number,
    >(this: S, start?: T, end?: U): Slice<S, T, U>

    split<const S extends string, D extends string>(
      this: S,
      delimiter: D
    ): Split<S, D>

    startsWith<
      const S extends string,
      const T extends string,
      P extends number = 0,
    >(this: S, searchString: T, position?: P): StartsWith<S, T, P>

    toLowerCase<const S extends string>(this: S): Lowercase<S>
    toUpperCase<const S extends string>(this: S): Uppercase<S>

    trim<const S extends string>(this: S): Trim<S>

    trimEnd<const S extends string>(this: S): TrimEnd<S>

    trimStart<const S extends string>(this: S): TrimStart<S>
  }
}
