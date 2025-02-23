/*
  956 - DeepPick
  -------
  by hiroya iizuka (@hiroyaiizuka) #hard #deep

  ### Question

  Implement a type DeepPick, that extends Utility types `Pick`.
  A type takes two arguments.


  For example:

  ```ts
  type obj = {
    name: 'hoge',
    age: 20,
    friend: {
      name: 'fuga',
      age: 30,
      family: {
        name: 'baz',
        age: 1
      }
    }
  }

  type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
  type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
  type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}

  ```

  > View on GitHub: https://tsch.js.org/956
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

type DeepPickSingle<T, K extends string> = K extends `${infer P}.${infer C}`
    ? P extends keyof T
        ? Record<P, DeepPickSingle<T[P], C>>
        : unknown
    : K extends keyof T
        ? Record<K, T[K]>
        : unknown;

type DeepPickInner<T, K extends string[]> = K extends [infer First extends string, ...infer Rest extends string[]]
    ? DeepPickSingle<T, First> & DeepPickInner<T, Rest>
    : unknown;

type DeepPick<T, K extends string> = UnionToTuple<K> extends infer U extends string[]
    ? DeepPickInner<T, U>
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/956/answer
  > View solutions: https://tsch.js.org/956/solutions
  > More Challenges: https://tsch.js.org
*/
