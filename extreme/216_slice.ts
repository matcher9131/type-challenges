/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #extreme #array

  ### Question

  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

  For example

  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```

  > View on GitHub: https://tsch.js.org/216
*/

/* _____________ Your Code Here _____________ */

type Pop<T extends unknown[]> = T extends [...infer Rest, infer Last] ? Rest : T;
type Unshift<T extends unknown[]> = [unknown, ...T];

type SignAndAbs<N extends number> = `${N}` extends `-${infer Abs extends number}`
    ? [true, Abs]
    : [false, N];

type SliceInner<
    T extends unknown[],
    Start extends [boolean, number],
    End extends [boolean, number],
    IsInRange extends boolean = false,
    CL extends unknown[] = [],
    CR extends unknown[] = T
> = End extends [false, CL["length"]]
    ? []
    : End extends [true, CR["length"]]
        ? []
        : T extends [infer First, ...infer Rest]
            ? Start extends [false, CL["length"]]
                ? [First, ...SliceInner<Rest, Start, End, true, Unshift<CL>, Pop<CR>>]
                : Start extends [true, CR["length"]]
                    ? [First, ...SliceInner<Rest, Start, End, true, Unshift<CL>, Pop<CR>>]
                    : IsInRange extends true
                        ? [First, ...SliceInner<Rest, Start, End, true, Unshift<CL>, Pop<CR>>]
                        : SliceInner<Rest, Start, End, false, Unshift<CL>, Pop<CR>>
            : [];

type Slice<T extends unknown[], Start extends number = 0, End extends number = T["length"]> = SliceInner<T, SignAndAbs<Start>, SignAndAbs<End>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/216/answer
  > View solutions: https://tsch.js.org/216/solutions
  > More Challenges: https://tsch.js.org
*/
