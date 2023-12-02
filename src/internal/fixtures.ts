export const SEPARATORS_TEXT =
  '[one] two-three/four.five(six){seven}|eight_nine\\ten' as const

export const WEIRD_TEXT =
  ' someWeird-cased$*String1986Foo [Bar] W_FOR_WUMBO...' as const

export type WeirdTextUnion =
  | typeof WEIRD_TEXT
  | "where's the leak ma'am"
  | 'dont.distribute unions'
