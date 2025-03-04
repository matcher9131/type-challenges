/*
  9384 - Maximum
  -------
  by ch3cknull (@ch3cknull) #hard #array

  ### Question

  ### Description

  Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.

  If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.

  For example:

  ```ts
  Maximum<[]> // never
  Maximum<[0, 2, 1]> // 2
  Maximum<[1, 20, 200, 150]> // 200
  ```

  ### Advanced

  Can you implement type `Minimum` inspired by `Maximum`?

  > View on GitHub: https://tsch.js.org/9384
*/

/* _____________ Your Code Here _____________ */

type Greater<X extends number, Y extends number, C extends unknown[] = []> = C["length"] extends X
    ? Y
    : C["length"] extends Y
        ? X
        : Greater<X, Y, [...C, unknown]>;
type MaximumInner<T extends number[], Result extends number> = T extends [infer First extends number, ...infer Rest extends number[]]
    ? MaximumInner<Rest, Greater<First, Result>>
    : Result;
type Maximum<T extends number[]> = T extends [infer First extends number, ...infer Rest extends number[]]
    ? MaximumInner<Rest, First>
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9384/answer
  > View solutions: https://tsch.js.org/9384/solutions
  > More Challenges: https://tsch.js.org
*/
