/*
  34286 - Take Elements
  -------
  by Eirik Måseidvåg (@Eirmas) #hard #array

  ### Question

  Implement a type `Take<N, Arr>` that returns the first `N` elements from an array `Arr`. If `N` is negative, return the last `|N|` elements

  For example,
  ```ts
  type T0 = Take<2, [1, 2, 3]> // [1, 2]
  type T1 = Take<3, ['1', 2, true, false]> // ['1', 2, true]
  type T2 = Take<-2, [1, 2, 3]> // [2, 3]
  type T3 = Take<0, [1, 2, 3]> // []
  type T4 = Take<5, [1, 2, 3]> // [1, 2, 3]
  type T5 = Take<3, []> // []
  ```

  > View on GitHub: https://tsch.js.org/34286
*/

/* _____________ Your Code Here _____________ */

type SignAndAbs<N extends number> = `${N}` extends `-${infer Abs extends number}`
    ? [true, Abs]
    : [false, N];

type TakeLeft<N extends number, T extends unknown[], C extends unknown[] = []> = C["length"] extends N
    ? []
    : T extends [infer First, ...infer Rest]
        ? [First, ...TakeLeft<N, Rest, [...C, unknown]>]
        : [];

type TakeRight<N extends number, T extends unknown[], C extends unknown[] = []> = C["length"] extends N
    ? []
    : T extends [...infer Rest, infer Last]
        ? [...TakeRight<N, Rest, [...C, unknown]>, Last]
        : [];

type Take<N extends number, T extends unknown[]> = SignAndAbs<N> extends [infer IsNegative, infer Abs extends number]
    ? IsNegative extends true
        ? TakeRight<Abs, T>
        : TakeLeft<Abs, T>
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Take<2, [1, 2, 3]>, [1, 2]>>,
  Expect<Equal<Take<3, ['1', 2, true, false]>, ['1', 2, true]>>,
  Expect<Equal<Take<-2, [1, 2, 3]>, [2, 3]>>,
  Expect<Equal<Take<0, [1, 2, 3]>, []>>,
  Expect<Equal<Take<5, [1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Take<3, []>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/34286/answer
  > View solutions: https://tsch.js.org/34286/solutions
  > More Challenges: https://tsch.js.org
*/
