/*
  9989 - Count Element Number To Object
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:

  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  // return {
  //   1: 1,
  //   2: 1,
  //   3: 1,
  //   4: 1,
  //   5: 1
  // }

  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  // return {
  //   1: 2,
  //   2: 2,
  //   3: 2,
  //   4: 1,
  //   5: 1
  // }
  ~~~

  > View on GitHub: https://tsch.js.org/9989
*/

/* _____________ Your Code Here _____________ */

type Merge<T extends Record<keyof any, unknown>, U extends Record<keyof any, unknown>> = {
    [P in keyof T | keyof U]:
        P extends keyof T ? T[P]
            : P extends keyof U ? U[P] : never;
}
type PlusOne<N extends number, C extends unknown[] = []> = C["length"] extends N ? [...C, unknown]["length"] : PlusOne<N, [...C, unknown]>;
type Replace<T extends Record<keyof any, unknown>, Key extends keyof any, U> = {
    [P in keyof T]: P extends Key ? U : T[P]
};
type CountElementNumberToObjectInner<T extends unknown[], Result extends Record<keyof any, number>> = T extends [infer First, ...infer Rest]
    ? First extends keyof any
        ? unknown extends Result[First]
            ? CountElementNumberToObjectInner<Rest, Merge<Result, Record<First, 1>>>
            : CountElementNumberToObjectInner<Rest, Replace<Result, First, PlusOne<Result[First]>>>
        : CountElementNumberToObjectInner<Rest, Result>
    : Result;

type Flatten<T extends unknown[]> = T extends [infer First, ...infer Rest]
    ? [...(First extends unknown[] ? Flatten<First> : [First]), ...Flatten<Rest>]
    : [];
type CountElementNumberToObject<T extends unknown[]> = T extends [never] ? {}
    : CountElementNumberToObjectInner<Flatten<T>, {}>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/
