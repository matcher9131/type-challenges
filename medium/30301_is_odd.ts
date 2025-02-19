/*
  30301 - IsOdd
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  return true is a number is odd

  > View on GitHub: https://tsch.js.org/30301
*/

/* _____________ Your Code Here _____________ */

type Floor<N extends number> = `${N}` extends `${infer Integer extends number}.${string}` ? Integer : N;
type IsInteger<N extends number> = N extends Floor<N> ? true : false;
type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : "";
type Lowest<N extends number> = Reverse<`${N}`> extends `${infer First extends number}${string}`
    ? First
    : never;
type IsOdd<N extends number> = number extends N
    ? false
    : IsInteger<N> extends false
        ? false
        : `${N}` extends `${infer Mantissa extends number}e${infer Exponent extends number}`
            ? Exponent extends 0
                ? true
                : false
        : Lowest<N> extends 1 | 3 | 5 | 7 | 9
            ? true
            : false;

type t1 = `${3e23}`;


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsOdd<5>, true>>,
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<2.3>, false>>,
  Expect<Equal<IsOdd<3e23>, false>>,
  Expect<Equal<IsOdd<3e0>, true>>,
  Expect<Equal<IsOdd<number>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30301/answer
  > View solutions: https://tsch.js.org/30301/solutions
  > More Challenges: https://tsch.js.org
*/
