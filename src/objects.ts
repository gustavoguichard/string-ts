type Specify<T> = T extends any ? (k: T) => void : never

// Real intersection: UnionToIntersection<`c${string}` | 'car'> will become `c${string}`
type UnionToIntersection<T> = Specify<T> extends (a: infer A) => void
  ? A
  : never

// Transforms 'a' | 'b' into ((f: "a") => void) & ((f: "b") => void)
type UnionToOverloads<U> = UnionToIntersection<Specify<U>>

// Still figuring out why this happens
// ((f: "a") => void) & ((f: "b") => void) will become "b"
type LastOfUnion<U> = UnionToOverloads<U> extends (a: infer A) => void
  ? A
  : never

// Only unions won't conform to this
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

// Grabs the last of union as a way to infer last and pops it with exclude
type UnionToTuple<T, output extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToTuple<Exclude<T, LastOfUnion<T>>, [LastOfUnion<T>, ...output]>
  : [T, ...output]

type ObjectFromEntries<T extends [string, any][]> = {
  [key in T[number][0]]: Extract<T[number], [key, any]>[1]
}

type ObjectKeys<T extends Record<string, any>> = UnionToTuple<keyof T>

type ObjectEntries<T extends Record<string, any>> = UnionToTuple<
  { [k in keyof T]: [k, T[k]] }[keyof T]
>

function objKeys<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj) as ObjectKeys<T>
}

function objEntries<T extends Record<string, any>>(obj: T) {
  return Object.entries(obj) as ObjectEntries<T>
}

function objFromEntries<T extends [string, any][]>(entries: T) {
  return Object.fromEntries(entries) as ObjectFromEntries<T>
}

const obj = { a: 1, b: 2, c: 3 } as const
const keys = objKeys(obj)
const entries = objEntries(obj)
const result = objFromEntries(entries)
type Keys = Expect<Equal<typeof keys, ['a', 'b', 'c']>>
type Entries = Expect<Equal<typeof entries, [['a', 1], ['b', 2], ['c', 3]]>>
type Result = Expect<Equal<typeof result, { a: 1; b: 2; c: 3 }>>
