/*
  7561 - Subtract
  -------
  by Lo (@LoTwT) #extreme #tuple

  ### Question

  Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.

  If the minuend is less than the subtrahend, it should be `never`.

  It's a simple version.

  For example

  ```ts
  Subtract<2, 1> // expect to be 1
  Subtract<1, 2> // expect to be never
  ```

  > View on GitHub: https://tsch.js.org/7561
*/

/* _____________ Your Code Here _____________ */

// Can do subtraction by large numbers

type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : "";

type Table = [
    [[[0, 0], [1, 9]], [[1, 9], [1, 8]], [[1, 8], [1, 7]], [[1, 7], [1, 6]], [[1, 6], [1, 5]], [[1, 5], [1, 4]], [[1, 4], [1, 3]], [[1, 3], [1, 2]], [[1, 2], [1, 1]], [[1, 1], [1, 0]]], 
    [[[0, 1], [0, 0]], [[0, 0], [1, 9]], [[1, 9], [1, 8]], [[1, 8], [1, 7]], [[1, 7], [1, 6]], [[1, 6], [1, 5]], [[1, 5], [1, 4]], [[1, 4], [1, 3]], [[1, 3], [1, 2]], [[1, 2], [1, 1]]], 
    [[[0, 2], [0, 1]], [[0, 1], [0, 0]], [[0, 0], [1, 9]], [[1, 9], [1, 8]], [[1, 8], [1, 7]], [[1, 7], [1, 6]], [[1, 6], [1, 5]], [[1, 5], [1, 4]], [[1, 4], [1, 3]], [[1, 3], [1, 2]]], 
    [[[0, 3], [0, 2]], [[0, 2], [0, 1]], [[0, 1], [0, 0]], [[0, 0], [1, 9]], [[1, 9], [1, 8]], [[1, 8], [1, 7]], [[1, 7], [1, 6]], [[1, 6], [1, 5]], [[1, 5], [1, 4]], [[1, 4], [1, 3]]], 
    [[[0, 4], [0, 3]], [[0, 3], [0, 2]], [[0, 2], [0, 1]], [[0, 1], [0, 0]], [[0, 0], [1, 9]], [[1, 9], [1, 8]], [[1, 8], [1, 7]], [[1, 7], [1, 6]], [[1, 6], [1, 5]], [[1, 5], [1, 4]]], 
    [[[0, 5], [0, 4]], [[0, 4], [0, 3]], [[0, 3], [0, 2]], [[0, 2], [0, 1]], [[0, 1], [0, 0]], [[0, 0], [1, 9]], [[1, 9], [1, 8]], [[1, 8], [1, 7]], [[1, 7], [1, 6]], [[1, 6], [1, 5]]], 
    [[[0, 6], [0, 5]], [[0, 5], [0, 4]], [[0, 4], [0, 3]], [[0, 3], [0, 2]], [[0, 2], [0, 1]], [[0, 1], [0, 0]], [[0, 0], [1, 9]], [[1, 9], [1, 8]], [[1, 8], [1, 7]], [[1, 7], [1, 6]]], 
    [[[0, 7], [0, 6]], [[0, 6], [0, 5]], [[0, 5], [0, 4]], [[0, 4], [0, 3]], [[0, 3], [0, 2]], [[0, 2], [0, 1]], [[0, 1], [0, 0]], [[0, 0], [1, 9]], [[1, 9], [1, 8]], [[1, 8], [1, 7]]], 
    [[[0, 8], [0, 7]], [[0, 7], [0, 6]], [[0, 6], [0, 5]], [[0, 5], [0, 4]], [[0, 4], [0, 3]], [[0, 3], [0, 2]], [[0, 2], [0, 1]], [[0, 1], [0, 0]], [[0, 0], [1, 9]], [[1, 9], [1, 8]]], 
    [[[0, 9], [0, 8]], [[0, 8], [0, 7]], [[0, 7], [0, 6]], [[0, 6], [0, 5]], [[0, 5], [0, 4]], [[0, 4], [0, 3]], [[0, 3], [0, 2]], [[0, 2], [0, 1]], [[0, 1], [0, 0]], [[0, 0], [1, 9]]]
];

type SubtractInner<X extends string, Y extends string, C extends 0 | 1 = 0, Result extends string = ""> = X extends `${infer XFirst extends number}${infer XRest}`
? Y extends `${infer YFirst extends number}${infer YRest}`
    ? Table[XFirst][YFirst][C] extends [infer NC extends 0 | 1, infer Z extends number]
        ? SubtractInner<XRest, YRest, NC, `${Result}${Z}`>
        : never
    : Table[XFirst][0][C] extends [infer NC extends 0 | 1, infer Z extends number]
        ? SubtractInner<XRest, "", NC, `${Result}${Z}`>
        : never
: Y extends `${infer YFirst extends number}${infer YRest}`
    ? ""
    : C extends 0
        ? Result
        : "";

type RemoveExtraZero<S extends string> = S extends "0"
    ? S
    : S extends `0${infer Rest}`
        ? RemoveExtraZero<Rest>
        : S;

type Subtract<X extends number, Y extends number> = RemoveExtraZero<Reverse<SubtractInner<Reverse<`${X}`>, Reverse<`${Y}`>>>> extends `${infer N extends number}`
    ? N
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  Expect<Equal<Subtract<1000, 999>, 1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7561/answer
  > View solutions: https://tsch.js.org/7561/solutions
  > More Challenges: https://tsch.js.org
*/
