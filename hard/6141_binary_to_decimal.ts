/*
  6141 - Binary to Decimal
  -------
  by wotsushi (@wotsushi) #hard #math

  ### Question

  Implement `BinaryToDecimal<S>` which takes an exact string type `S` consisting 0 and 1 and returns an exact number type corresponding with `S` when `S` is regarded as a binary.
  You can assume that the length of `S` is equal to or less than 8 and `S` is not empty.

  ```ts
  type Res1 = BinaryToDecimal<'10'>; // expected to be 2
  type Res2 = BinaryToDecimal<'0011'>; // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/6141
*/

/* _____________ Your Code Here _____________ */

type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : "";
    
type Pow2<N extends number, C extends unknown[] = [], Result extends unknown[] = [unknown]> = C["length"] extends N
    ? Result
    : Pow2<N, [...C, unknown], [...Result, ...Result]>;

type BinaryToDecimalInner<S extends string, C extends unknown[] = []> = S extends `${infer First}${infer Rest}`
    ? [...(First extends "1" ? Pow2<C["length"]> : []), ...BinaryToDecimalInner<Rest, [...C, unknown]>]
    : [];

type BinaryToDecimal<S extends string> = BinaryToDecimalInner<Reverse<S>>["length"];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6141/answer
  > View solutions: https://tsch.js.org/6141/solutions
  > More Challenges: https://tsch.js.org
*/
