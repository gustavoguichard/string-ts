export type UncapitalizeSTS<T extends string> = string extends T
  ? string
  : Uncapitalize<T>

export type LowercaseSTS<T extends string> = string extends T
  ? string
  : Lowercase<T>

export type UppercaseSTS<T extends string> = string extends T
  ? string
  : Uppercase<T>

export type CapitalizeSTS<T extends string> = string extends T
  ? string
  : Capitalize<T>
