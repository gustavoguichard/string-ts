import { Join } from '../native/join'
import type { Split } from '../native/split'

type IndentTypes = ' ' | '\t'

type TrimStartEnd<T extends string> = T extends `\n${infer Content}`
  ? TrimStartEnd<Content>
  : T extends `${infer Content}\n` ? Content
  : T

type GetIndentation<
  T extends string,
  Indentation extends string[] = [],
> = T extends `${infer Indent extends IndentTypes}${infer Content}`
  ? GetIndentation<Content, [Indent, ...Indentation]>
  : Join<Indentation>

type ReplaceIndentation<
  T extends string[],
  Ind extends string,
> = T extends [infer First, ...infer Rest extends string[]]
  ? First extends `${Ind}${infer Content}`
  ? [Content, ...ReplaceIndentation<Rest, Ind>]
  : [First, ...ReplaceIndentation<Rest, Ind>]
  : T

export type Dedent<
  String extends string,
  SplitString extends string[] = Split<TrimStartEnd<String>, '\n'>,
  Indentizer extends string = GetIndentation<SplitString[0]>,
> = Join<ReplaceIndentation<SplitString, Indentizer>, '\n'>

export function dedent<T extends string>(str: T) {
  let lines = str.split('\n')
  while (lines[0] === '') lines = lines.slice(1)
  while (lines[lines.length + 1] === '') lines = lines.slice(0, -1)

  const indentation = lines[0].match(/^(\s*)/)![0].length

  return (
    indentation
      ? lines.map((line) => line.slice(indentation)).join('\n')
      : lines.join('\n')
  ) as Dedent<T>
}

const data = `
  Leading and trailing lines will be trimmed, so you can write something like
  this and have it work as you expect:
    * how convenient it is
    * that I can use an indented list
        - and still have it do the right thing
  That's all.
`

const dedented = dedent(data)
type Dedented = Dedent<typeof data>
