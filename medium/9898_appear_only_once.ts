/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，ouput: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

type Contains<T extends unknown[], U> = T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true
        ? true
        : Contains<Rest, U>
    : false;
type UniqueElementInner<T extends unknown[], Left extends unknown[]> = T extends [infer First, ...infer Rest]
    ? Contains<Rest, First> extends true
        ? UniqueElementInner<Rest, [...Left, First]>
        : Contains<Left, First> extends true
            ? UniqueElementInner<Rest, [...Left, First]>
            : [First, ...UniqueElementInner<Rest, [...Left, First]>]
    : [];
type UniqueElement<T extends unknown[]> = UniqueElementInner<T, []>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<UniqueElement<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<UniqueElement<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<UniqueElement<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<UniqueElement<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<UniqueElement<[1, 2, number, number]>, [1, 2]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9898/answer
  > View solutions: https://tsch.js.org/9898/solutions
  > More Challenges: https://tsch.js.org
*/
