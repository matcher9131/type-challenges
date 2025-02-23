/*
  2949 - ObjectFromEntries
  -------
  by jiangshan (@jiangshanmeta) #hard #object

  ### Question

  Implement the type version of ```Object.fromEntries```

  For example:

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }

  type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

  type result = ObjectFromEntries<ModelEntries> // expected to be Model
  ```

  > View on GitHub: https://tsch.js.org/2949
*/

/* _____________ Your Code Here _____________ */

// Types for UnionToTuple
type ToFunctionParam<T> = T extends T
    ? (x: T) => void
    : never;
type UnionToIntersection<T> = ToFunctionParam<T> extends (x: infer U) => void
    ? U
    : never;
type LastOfUnion<T> = UnionToIntersection<ToFunctionParam<T>> extends (x: infer Last) => void
    ? Last
    : never;
type UnionToTuple<T, Last = LastOfUnion<T>> = [T] extends [never]
    ? []
    : [...UnionToTuple<Exclude<T, Last>>, Last];
// End types for UnionToTuple

type FlattenObject<T> = {
    [P in keyof T]: T[P];
};

type ObjectFromEntriesInner<T extends [string, unknown][]> = T extends [[infer P extends string, infer V], ...infer Rest extends [string, unknown][]]
    ? Record<P, V> & ObjectFromEntriesInner<Rest>
    : {};

type ObjectFromEntries<T extends [string, unknown]> = UnionToTuple<T> extends infer U extends [string, unknown][]
    ? FlattenObject<ObjectFromEntriesInner<U>>
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2949/answer
  > View solutions: https://tsch.js.org/2949/solutions
  > More Challenges: https://tsch.js.org
*/
