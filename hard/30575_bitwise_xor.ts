/*
  30575 - BitwiseXOR
  -------
  by jiangshan (@jiangshanmeta) #hard

  ### Question

  Implement ```BitwiseXOR<S1,S2>``` which takes two binary string literal type and returns a binary string that reprents the bitwise XOR of S1 and S2

  For example:

  ```typescript
  BitwiseXOR<'0','1'> // expect '1'
  BitwiseXOR<'1','1'> // expect '0'
  BitwiseXOR<'10','1'>  // expect '11'
  ```

  > View on GitHub: https://tsch.js.org/30575
*/

/* _____________ Your Code Here _____________ */

type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : "";

type SingleBitwiseXOR<X extends string, Y extends string> = X extends "1"
    ? Y extends "1"
        ? "0"
        : Y extends "0"
            ? "1"
            : never
    : X extends "0"
        ? Y extends "1"
            ? "1"
            : Y extends "0"
                ? "0"
                : never
        : never;

type BitwiseXORInner<X extends string, Y extends string> = X extends `${infer XFirst}${infer XRest}`
    ? Y extends `${infer YFirst}${infer YRest}`
        ? `${SingleBitwiseXOR<XFirst, YFirst>}${BitwiseXORInner<XRest, YRest>}`
        : `${SingleBitwiseXOR<XFirst, "0">}${BitwiseXORInner<XRest, "">}`
    : Y extends `${infer YFirst}${infer YRest}`
        ? `${SingleBitwiseXOR<"0", YFirst>}${BitwiseXORInner<"", YRest>}`
        : "";

type BitwiseXOR<X extends string, Y extends string> = Reverse<BitwiseXORInner<Reverse<X>, Reverse<Y>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30575/answer
  > View solutions: https://tsch.js.org/30575/solutions
  > More Challenges: https://tsch.js.org
*/
