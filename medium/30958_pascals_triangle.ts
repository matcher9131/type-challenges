/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #medium #array #math

  ### Question

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > View on GitHub: https://tsch.js.org/30958
*/

/* _____________ Your Code Here _____________ */

type NumberToTuple<N extends number, C extends unknown[] = []> = C["length"] extends N ? C : NumberToTuple<N, [...C, unknown]>;
type Add<X extends number, Y extends number> = [...NumberToTuple<X>, ...NumberToTuple<Y>]["length"];
type SumAdjacent<T extends number[]> = T extends [infer First extends number, infer Second extends number, ...infer Rest extends number[]]
    ? [Add<First, Second>, ...SumAdjacent<[Second, ...Rest]>]
    : [];
type LastOf<T extends unknown[]> = T extends [...infer Rest, infer Last] ? Last : [];
type PascalInner<N extends number, Result extends number[][] = [[1]]> = Result["length"] extends N
    ? Result
    : PascalInner<N, [...Result, [1, ...SumAdjacent<LastOf<Result>>, 1]]>;
type Pascal<N extends number> = PascalInner<N>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30958/answer
  > View solutions: https://tsch.js.org/30958/solutions
  > More Challenges: https://tsch.js.org
*/
