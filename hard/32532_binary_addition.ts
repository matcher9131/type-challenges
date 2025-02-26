/*
  32532 - Binary Addition
  -------
  by Finley Garton (@finleygn) #hard #recursion #array

  ### Question

  Implement `BinaryAdd` to add two binary numbers together. The numbers should not be translated out of binary at any point.

  Note the two inputs will always have the same length.

  > View on GitHub: https://tsch.js.org/32532
*/

/* _____________ Your Code Here _____________ */

type Bit = 1 | 0
type Reverse<T extends Bit[]> = T extends [infer First, ...infer Rest extends Bit[]]
    ? [...Reverse<Rest>, First]
    : [];
type AddBit<X extends Bit, Y extends Bit, C extends Bit = 0> = X extends 1
    ? Y extends 1
        ? C extends 1
            ? [1, 1]
            : [1, 0]
        : C extends 1
            ? [1, 0]
            : [0, 1]
    : Y extends 1
        ? C extends 1
            ? [1, 0]
            : [0, 1]
        : C extends 1
            ? [0, 1]
            : [0, 0];

type BinaryAddInner<X extends Bit[], Y extends Bit[], C extends Bit = 0> = X extends [infer XFirst extends Bit, ...infer XRest extends Bit[]]
    ? Y extends [infer YFirst extends Bit, ...infer YRest extends Bit[]]
        ? AddBit<XFirst, YFirst, C> extends [infer NewCarry extends Bit, infer Digit]
            ? [Digit, ...BinaryAddInner<XRest, YRest, NewCarry>]
            : never
        : never
    : C extends 1
        ? [1]
        : [];

type BinaryAdd<X extends Bit[], Y extends Bit[]> = Reverse<BinaryAddInner<Reverse<X>, Reverse<Y>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    BinaryAdd<[1], [1]>,
    [1, 0]
  >>,
  Expect<Equal<
    BinaryAdd<[0], [1]>,
    [1]
  >>,
  Expect<Equal<
    BinaryAdd<[1, 1, 0], [0, 0, 1]>,
    [1, 1, 1]
  >>,
  Expect<Equal<
    BinaryAdd<[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]>,
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  >>,
  Expect<Equal<
    BinaryAdd<[1, 0, 1, 0, 1, 1, 1, 0], [1, 0, 0, 0, 1, 1, 0, 0]>,
    [1, 0, 0, 1, 1, 1, 0, 1, 0]
  >>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/32532/answer
  > View solutions: https://tsch.js.org/32532/solutions
  > More Challenges: https://tsch.js.org
*/
