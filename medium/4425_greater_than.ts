/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type CompareLength<X extends string, Y extends string> = X extends `${infer XFirst}${infer XRest}`
    ? Y extends `${infer YFirst}${infer YRest}`
        ? CompareLength<XRest, YRest>
        : 1
    : Y extends `${infer YFirst}${infer YRest}`
        ? -1
        : 0;
type MinusOne<X extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8][X];
type CompareDigit<X extends number, Y extends number> = X extends 0
    ? Y extends 0
        ? 0
        : -1
    : Y extends 0
        ? 1
        : CompareDigit<MinusOne<X>, MinusOne<Y>>;
type CompareEachDigit<X extends string, Y extends string> = X extends `${infer XFirst extends number}${infer XRest}`
    ? Y extends `${infer YFirst extends number}${infer YRest}`
        ? CompareDigit<XFirst, YFirst> extends 0
            ? CompareEachDigit<XRest, YRest>
            : CompareDigit<XFirst, YFirst> extends 1
                ? 1
                : -1
        : never
    : 0;
type GreaterThan<X extends number, Y extends number> = CompareLength<`${X}`, `${Y}`> extends 0
    ? CompareEachDigit<`${X}`, `${Y}`> extends 1 ? true : false
    : CompareLength<`${X}`, `${Y}`> extends 1 ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
