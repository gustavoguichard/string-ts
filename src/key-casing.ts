import {
  CamelCase,
  ConstantCase,
  KebabCase,
  PascalCase,
  SnakeCase,
  toCamelCase,
  toConstantCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from './casing'
import { typeOf } from './internals'
import { Is } from './utils'

function deepTransformKeys<T>(obj: T, transform: (s: string) => string): T {
  if (!['object', 'array'].includes(typeOf(obj))) return obj

  if (Array.isArray(obj)) {
    return obj.map((x) => deepTransformKeys(x, transform)) as T
  }
  const res = {} as T
  for (const key in obj) {
    res[transform(key) as keyof T] = deepTransformKeys(obj[key], transform)
  }
  return res
}

type DeepCamelKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepCamelKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepCamelKeys<V>[]
  : {
      [K in keyof T as CamelCase<Is<K, string>>]: DeepCamelKeys<T[K]>
    }
function deepCamelKeys<T>(obj: T): DeepCamelKeys<T> {
  return deepTransformKeys(obj, toCamelCase) as never
}

type DeepSnakeKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepSnakeKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepSnakeKeys<V>[]
  : {
      [K in keyof T as SnakeCase<Is<K, string>>]: DeepSnakeKeys<T[K]>
    }
function deepSnakeKeys<T>(obj: T): DeepSnakeKeys<T> {
  return deepTransformKeys(obj, toSnakeCase) as never
}

type DeepKebabKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepKebabKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepKebabKeys<V>[]
  : {
      [K in keyof T as KebabCase<Is<K, string>>]: DeepKebabKeys<T[K]>
    }
function deepKebabKeys<T>(obj: T): DeepKebabKeys<T> {
  return deepTransformKeys(obj, toKebabCase) as never
}

type DeepPascalKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepPascalKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepPascalKeys<V>[]
  : {
      [K in keyof T as PascalCase<Is<K, string>>]: DeepPascalKeys<T[K]>
    }
function deepPascalKeys<T>(obj: T): DeepPascalKeys<T> {
  return deepTransformKeys(obj, toPascalCase) as never
}

type DeepConstantKeys<T> = T extends [any, ...any]
  ? { [I in keyof T]: DeepConstantKeys<T[I]> }
  : T extends (infer V)[]
  ? DeepConstantKeys<V>[]
  : {
      [K in keyof T as ConstantCase<Is<K, string>>]: DeepConstantKeys<T[K]>
    }
function deepConstantKeys<T>(obj: T): DeepConstantKeys<T> {
  return deepTransformKeys(obj, toConstantCase) as never
}

export type {
  DeepCamelKeys,
  DeepSnakeKeys,
  DeepKebabKeys,
  DeepPascalKeys,
  DeepConstantKeys,
}
export {
  deepCamelKeys,
  deepSnakeKeys,
  deepKebabKeys,
  deepPascalKeys,
  deepConstantKeys,
  deepTransformKeys,
}
