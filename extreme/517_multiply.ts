/*
  517 - Multiply
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  **This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first, and modify your code based on it to start this challenge.**

  Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string. Numbers can be specified as string, number, or bigint.

  For example,

  ```ts
  type T0 = Multiply<2, 3> // '6'
  type T1 = Multiply<3, '5'> // '15'
  type T2 = Multiply<'4', 10> // '40'
  type T3 = Multiply<0, 16> // '0'
  type T4 = Multiply<'13', '21'> // '273'
  type T5 = Multiply<'43423', 321543n> // '13962361689'
  ```

  > View on GitHub: https://tsch.js.org/517
*/

/* _____________ Your Code Here _____________ */

type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : "";

type TrimZero<S extends string> = S extends `0${infer Rest}`
    ? Rest extends ""
        ? S
        : TrimZero<Rest>
    : S;

type AddTable = [
    [[[0, 0], [0, 1]], [[0, 1], [0, 2]], [[0, 2], [0, 3]], [[0, 3], [0, 4]], [[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]]],
    [[[0, 1], [0, 2]], [[0, 2], [0, 3]], [[0, 3], [0, 4]], [[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]]],
    [[[0, 2], [0, 3]], [[0, 3], [0, 4]], [[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]]],
    [[[0, 3], [0, 4]], [[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]]],
    [[[0, 4], [0, 5]], [[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]]],
    [[[0, 5], [0, 6]], [[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]]],
    [[[0, 6], [0, 7]], [[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]], [[1, 5], [1, 6]]],
    [[[0, 7], [0, 8]], [[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]], [[1, 5], [1, 6]], [[1, 6], [1, 7]]],
    [[[0, 8], [0, 9]], [[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]], [[1, 5], [1, 6]], [[1, 6], [1, 7]], [[1, 7], [1, 8]]],
    [[[0, 9], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [1, 2]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[1, 4], [1, 5]], [[1, 5], [1, 6]], [[1, 6], [1, 7]], [[1, 7], [1, 8]], [[1, 8], [1, 9]]]
];

type Add<X extends string, Y extends string, C extends 0 | 1 = 0> = X extends `${infer XFirst extends number}${infer XRest}`
    ? Y extends `${infer YFirst extends number}${infer YRest}`
        ? AddTable[XFirst][YFirst][C] extends [infer NC extends 0 | 1, infer Z extends number]
            ? `${Z}${Add<XRest, YRest, NC>}`
            : never
        : AddTable[XFirst][0][C] extends [infer NC extends 0 | 1, infer Z extends number]
            ? `${Z}${Add<XRest, "", NC>}`
            : never
    : Y extends `${infer YFirst extends number}${infer YRest}`
        ? AddTable[0][YFirst][C] extends [infer NC extends 0 | 1, infer Z extends number]
            ? `${Z}${Add<"", YRest, NC>}`
            : never
        : C extends 1
            ? "1"
            : "";

type MultiplyTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
    [0, 2, 4, 6, 8, 10, 12, 14, 16, 18], 
    [0, 3, 6, 9, 12, 15, 18, 21, 24, 27], 
    [0, 4, 8, 12, 16, 20, 24, 28, 32, 36], 
    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45], 
    [0, 6, 12, 18, 24, 30, 36, 42, 48, 54], 
    [0, 7, 14, 21, 28, 35, 42, 49, 56, 63], 
    [0, 8, 16, 24, 32, 40, 48, 56, 64, 72], 
    [0, 9, 18, 27, 36, 45, 54, 63, 72, 81]
];

type MultiplySingleDigit<X extends string, Y extends number, Result extends string = "0", Z extends string = ""> = X extends `${infer First extends number}${infer Rest}`
    ? MultiplySingleDigit<Rest, Y, Add<Result, Reverse<`${MultiplyTable[First][Y]}${Z}`>>, `${Z}0`>
    : Result;

type MultiplyInner<X extends string, Y extends string, Result extends string = "0", Z extends string = ""> = Y extends `${infer First extends number}${infer Rest}`
    ? MultiplyInner<X, Rest, Add<Result, `${Z}${MultiplySingleDigit<X, First>}`>, `${Z}0`>
    : Result;

type Multiply<X extends string | number | bigint, Y extends string | number | bigint> = TrimZero<Reverse<MultiplyInner<Reverse<`${X}`>, Reverse<`${Y}`>>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/517/answer
  > View solutions: https://tsch.js.org/517/solutions
  > More Challenges: https://tsch.js.org
*/
