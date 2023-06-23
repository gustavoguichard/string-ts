type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Separator = ' ' | '_' | '-' | '.' | '/'

// TEST UTILITIES
type Expect<T extends true> = T
type Equal<A, B> =
  // prettier-ignore
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true
    : false

// GENERAL UTILITIES

/**
 * Assures the generic matches the given condition so we avoid nesting more conditional types.
 */
type Is<T, cond> = Extract<T, cond>
