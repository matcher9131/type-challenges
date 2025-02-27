/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
*/

/* _____________ Your Code Here _____________ */

type Table = [
    [[[0, 0], [0, 1]], [[0, 1], [0, 2]], [[0, 2], [0, 3]], [[0, 3], [0, 4]], [[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]]],
    [[[0, 1], [0, 2]], [[0, 2], [0, 3]], [[0, 3], [0, 4]], [[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]]],
    [[[0, 2], [0, 3]], [[0, 3], [0, 4]], [[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]]],
    [[[0, 3], [0, 4]], [[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]]],
    [[[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]]],
    [[[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]]],
    [[[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]], [[1, 5], [1, 6]]],
    [[[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]], [[1, 5], [1, 6]], [[1, 6], [1, 7]]],
    [[[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]], [[1, 5], [1, 6]], [[1, 6], [1, 7]], [[1, 7], [1, 8]]],
    [[[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]], [[1, 5], [1, 6]], [[1, 6], [1, 7]], [[1, 7], [1, 8]], [[1, 8], [1, 9]]]
];

type Add<X extends string, Y extends string, C extends 0 | 1 = 0> = X extends `${infer XFirst extends number}${infer XRest}`
    ? Y extends `${infer YFirst extends number}${infer YRest}`
        ? Table[XFirst][YFirst][C] extends [infer NC extends 0 | 1, infer Z extends number]
            ? `${Z}${Add<XRest, YRest, NC>}`
            : never
        : Table[XFirst][0][C] extends [infer NC extends 0 | 1, infer Z extends number]
            ? `${Z}${Add<XRest, "", NC>}`
            : never
    : Y extends `${infer YFirst extends number}${infer YRest}`
        ? Table[0][YFirst][C] extends [infer NC extends 0 | 1, infer Z extends number]
            ? `${Z}${Add<"", YRest, NC>}`
            : never
        : C extends 1
            ? "1"
            : "";

type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : "";

type Sum<A extends string | number | bigint, B extends string | number | bigint> = Reverse<Add<Reverse<`${A}`>, Reverse<`${B}`>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/
