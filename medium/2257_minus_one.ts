/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

type Reverse<S extends string> = S extends `${infer First}${infer Rest}` ? `${Reverse<Rest>}${First}` : S;
type MinusOneInner<S extends string> = S extends `${infer First extends number}${infer Rest}`
    ? First extends 0
        ? `9${MinusOneInner<Rest>}`
        : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][First]}${Rest}`
    : never;
type RemoveExtraZeros<S extends string> = S extends `0${infer Right}`
    ? RemoveExtraZeros<Right>
    : S;
type ParseInt<S extends string> = S extends `${infer N extends number}` ? N : never;
type MinusOne<T extends number> = T extends 1 ? 0
    : ParseInt<RemoveExtraZeros<Reverse<MinusOneInner<Reverse<`${T}`>>>>>;

type t = MinusOne<100>;
type t2 = RemoveExtraZeros<"0">

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
