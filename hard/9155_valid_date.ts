/*
  9155 - ValidDate
  -------
  by ch3cknull (@ch3cknull) #hard

  ### Question

  Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.

  **Leap year is not considered**

  Good Luck!

  ```ts
  ValidDate<'0102'> // true
  ValidDate<'0131'> // true
  ValidDate<'1231'> // true
  ValidDate<'0229'> // false
  ValidDate<'0100'> // false
  ValidDate<'0132'> // false
  ValidDate<'1301'> // false
  ```

  > View on GitHub: https://tsch.js.org/9155
*/

/* _____________ Your Code Here _____________ */

type Range<N extends number, C extends unknown[] = [unknown]> = C["length"] extends N
    ? C["length"]
    :  C["length"] | Range<N, [...C, unknown]>;
type DateOfFebruary = Range<28>;
type DateOfSmallMonth = Range<30>;
type DateOfBigMonth = Range<31>;

type Split<S extends string> = S extends `${infer M0}${infer M1}${infer D0}${infer D1}${infer Rest}`
    ? Rest extends ""
        ? [`${M0}${M1}`, `${D0}${D1}`]
        : []
    : [];

type ParsePositiveInt<S extends string> = S extends `0${infer T}`
    ? ParsePositiveInt<T>
    : S extends `${infer N extends number}`
        ? N
        : false;

type ValidDate<S extends string> = Split<S> extends [infer S1 extends string, infer S2 extends string]
    ? [ParsePositiveInt<S1>, ParsePositiveInt<S2>] extends [infer M extends number, infer D extends number]
        ? M extends 2
            ? D extends DateOfFebruary ? true : false
            : M extends 4 | 6 | 9 | 11
                ? D extends DateOfSmallMonth ? true : false
                : M extends 1 | 3 | 5 | 7 | 8 | 10 | 12
                    ? D extends DateOfBigMonth ? true : false
                    : false
        : false
    : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'0430'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9155/answer
  > View solutions: https://tsch.js.org/9155/solutions
  > More Challenges: https://tsch.js.org
*/
