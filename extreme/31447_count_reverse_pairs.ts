/*
  31447 - CountReversePairs
  -------
  by jiangshan (@jiangshanmeta) #extreme

  ### Question

  Given an integer array nums, return the number of reverse pairs in the array.

  A reverse pair is a pair (i, j) where:

  * 0 <= i < j < nums.length and
  * nums[i] > nums[j].

  > View on GitHub: https://tsch.js.org/31447
*/

/* _____________ Your Code Here _____________ */

// Can count reverse pairs with any decimals.

// Types for Compare
type Invert<T> = T extends 1
    ? -1
    : T extends -1
        ? 1
        : T;

// [isNegative, integerPart, decimalPart] (without decimal point)
type SignAndAbs<N extends number> = `${N}` extends `${infer Integer}.${infer Decimal}`
    ? Integer extends `-${infer Abs}`
        ? [true, Abs, Decimal]
        : [false, Integer, Decimal]
    : `${N}` extends `-${infer Abs}`
        ? [true, Abs, ""]
        : [false, `${N}`, ""];

type ComparisonTable = [
    [0, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 0, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 1, 0, -1, -1, -1, -1, -1, -1, -1],
    [1, 1, 1, 0, -1, -1, -1, -1, -1, -1],
    [1, 1, 1, 1, 0, -1, -1, -1, -1, -1],
    [1, 1, 1, 1, 1, 0, -1, -1, -1, -1],
    [1, 1, 1, 1, 1, 1, 0, -1, -1, -1],
    [1, 1, 1, 1, 1, 1, 1, 0, -1, -1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, -1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

type CompareLength<X extends string, Y extends string> = X extends `${infer XFirst}${infer XRest}`
    ? Y extends `${infer YFirst}${infer YRest}`
        ? CompareLength<XRest, YRest>
        : 1
    : Y extends `${infer YFirst}${infer YRest}`
        ? -1
        : 0;

type ComparePart<X extends string, Y extends string> = X extends `${infer XFirst extends number}${infer XRest}`
    ? Y extends `${infer YFirst extends number}${infer YRest}`
        ? ComparisonTable[XFirst][YFirst] extends infer Result
            ? Result extends 0
                ? ComparePart<XRest, YRest>
                : Result
            : never
        : ComparisonTable[XFirst][0]
    : Y extends `${infer YFirst extends number}${infer YRest}`
        ? ComparisonTable[0][YFirst]
        : 0;

type CompareInteger<X extends string, Y extends string> = CompareLength<X, Y> extends infer Result
    ? Result extends 0
        ? ComparePart<X, Y>
        : Result
    : never;

type Compare<X extends number, Y extends number> = SignAndAbs<X> extends [infer SignX, infer IntegerX extends string, infer DecimalX extends string]
    ? SignAndAbs<Y> extends [infer SignY, infer IntegerY extends string, infer DecimalY extends string]
        ? SignX extends true
            ? SignY extends true
                ? CompareInteger<IntegerX, IntegerY> extends infer IntegerResult
                    ? IntegerResult extends 0
                        ? Invert<ComparePart<DecimalX, DecimalY>>
                        : Invert<IntegerResult>
                    : never
                : -1
            : SignY extends true
                ? 1
                : CompareInteger<IntegerX, IntegerY> extends infer IntegerResult
                    ? IntegerResult extends 0
                        ? ComparePart<DecimalX, DecimalY>
                        : IntegerResult
                    : never
        : never
    : never;
// End types for Compare

type MaximumToLast<T extends number[], Result extends number[] = [], C extends unknown[] = []> = T extends [infer First extends number, infer Second extends number, ...infer Rest extends number[]]
    ? Compare<First, Second> extends 1
        ? MaximumToLast<[First, ...Rest], [...Result, Second], [...C, unknown]>
        : MaximumToLast<[Second, ...Rest], [...Result, First], C>
    : [[...Result, ...T], C];

type CountReversePairsInner<T extends number[], C extends unknown[]> = T extends []
    ? C["length"]
    : MaximumToLast<T> extends [[...infer URest extends number[], infer ULast], infer NC extends unknown[]]
        ? CountReversePairsInner<URest, [...C, ...NC]>
        : never;

type CountReversePairs<T extends number[]> = CountReversePairsInner<T, []>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountReversePairs<[5, 2, 6, 1]>, 4>>,
  Expect<Equal<CountReversePairs<[1, 2, 3, 4]>, 0>>,
  Expect<Equal<CountReversePairs<[-1, -1]>, 0>>,
  Expect<Equal<CountReversePairs<[-1]>, 0>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/31447/answer
  > View solutions: https://tsch.js.org/31447/solutions
  > More Challenges: https://tsch.js.org
*/
