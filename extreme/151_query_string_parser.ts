/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #extreme #template-literal

  ### Question

  You're required to implement a type-level parser to parse URL query string into a object literal type.

  Some detailed requirements:

  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.

  > View on GitHub: https://tsch.js.org/151
*/

/* _____________ Your Code Here _____________ */

type FlattenObject<T> = {
    [P in keyof T]: T[P] extends [infer U] ? U : T[P];
};

type Split<S extends string> = S extends ""
    ? []
    : S extends `${infer First}&${infer Rest}`
        ? [First, ...Split<Rest>]
        : [S];

type Contains<T extends unknown[], U> = T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true
        ? true
        : Contains<Rest, U>
    : false;

type ParseQueryStringInner<S extends string[], Result extends Record<string, unknown[]> = {}> = S extends [infer First, ...infer Rest extends string[]]
    ? First extends `${infer Key}=${infer Value}`
        ? Key extends keyof Result
            ? Contains<Result[Key], Value> extends true
                ? ParseQueryStringInner<Rest, Result>
                : ParseQueryStringInner<Rest, Omit<Result, Key> & Record<Key, [...Result[Key], Value]>>
            : ParseQueryStringInner<Rest, Result & Record<Key, [Value]>>
        : First extends keyof Result
            ? Contains<Result[First], true> extends true
                ? ParseQueryStringInner<Rest, Result>
                : ParseQueryStringInner<Rest, Omit<Result, First> & Record<First, [...Result[First], true]>>
            : ParseQueryStringInner<Rest, Result & Record<First & string, [true]>>
    : Result;

type ParseQueryString<S extends string> = FlattenObject<ParseQueryStringInner<Split<S>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true, k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1', k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2'], k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1', k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'], k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3'], k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/151/answer
  > View solutions: https://tsch.js.org/151/solutions
  > More Challenges: https://tsch.js.org
*/
