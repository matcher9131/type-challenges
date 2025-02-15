/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
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

type FlattenDepth<T extends unknown[], D extends number = 1> = D extends 0
    ? T
    : T extends [infer First, ...infer Rest]
        ? [...(First extends unknown[] ? FlattenDepth<First, MinusOne<D>> : [First]), ...FlattenDepth<Rest, D>]
        : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
