/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #hard #union #recursion

  ### Question

  Implement Camelize which converts object from snake_case to to camelCase

  ```ts
  Camelize<{
    some_prop: string,
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>

  // expected to be
  // {
  //   someProp: string,
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```

  > View on GitHub: https://tsch.js.org/1383
*/

/* _____________ Your Code Here _____________ */

type SnakeCaseToCamelCase<S extends string> = S extends `${infer Left}_${infer Right}`
    ? `${Left}${SnakeCaseToCamelCase<Capitalize<Right>>}`
    : S;

type Camelize<T> = T extends unknown[]
    ? T extends [infer First, ...infer Rest]
        ? First extends object
            ? [Camelize<First>, ...Camelize<Rest>]
            : [First, ...Camelize<Rest>]
        : []
    : T extends object
        ? {
            [P in keyof T as P extends string ? SnakeCaseToCamelCase<P> : never]: T[P] extends object
                ? Camelize<T[P]>
                : T[P]
        }
        : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1383/answer
  > View solutions: https://tsch.js.org/1383/solutions
  > More Challenges: https://tsch.js.org
*/
