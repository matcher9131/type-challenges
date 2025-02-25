/*
  13580 - Replace Union
  -------
  by Konstantin Barabanov (@crutch12) #hard

  ### Question

  Given an `union of types` and `array of type pairs` to replace (`[[string, number], [Date, null]]`), return a new union replaced with the `type pairs`.

  > View on GitHub: https://tsch.js.org/13580
*/

/* _____________ Your Code Here _____________ */

// Type for UnionToTuple
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

type Replace<T extends unknown[], Replacee, Replacer> = T extends [infer First, ...infer Rest]
    ? Equal<First, Replacee> extends true
        ? [Replacer, ...Replace<Rest, Replacee, Replacer>]
        : [First, ...Replace<Rest, Replacee, Replacer>]
    : [];

type UnionReplaceInner<T extends unknown[], U extends [any, any][]> =  U extends [[infer Replacee, infer Replacer], ...infer URest extends [any, any][]]
    ? UnionReplaceInner<Replace<T, Replacee, Replacer>, URest>
    : T;

type UnionReplace<T, U extends [any, any][]> = UnionReplaceInner<UnionToTuple<T>, U>[number];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null], [Date, Function]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/13580/answer
  > View solutions: https://tsch.js.org/13580/solutions
  > More Challenges: https://tsch.js.org
*/
