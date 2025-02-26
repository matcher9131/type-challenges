/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math

  ### Question

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is Lesser than `b`, type should be `Comparison.Lesser`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

// I suppose Greater <--> Lesser and Higher <--> Lower are correct, so rename Lower => Lesser 

enum Comparison {
    Greater,
    Equal,
    Lesser,
}

type Invert<T> = T extends Comparison.Greater
    ? Comparison.Lesser
    : T extends Comparison.Lesser
        ? Comparison.Greater
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
    [Comparison.Equal, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser],
    [Comparison.Greater, Comparison.Equal, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser],
    [Comparison.Greater, Comparison.Greater, Comparison.Equal, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser],
    [Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Equal, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser],
    [Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Equal, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser],
    [Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Equal, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser],
    [Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Equal, Comparison.Lesser, Comparison.Lesser, Comparison.Lesser],
    [Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Equal, Comparison.Lesser, Comparison.Lesser],
    [Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Equal, Comparison.Lesser],
    [Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Greater, Comparison.Equal],
];

type CompareLength<X extends string, Y extends string> = X extends `${infer XFirst}${infer XRest}`
    ? Y extends `${infer YFirst}${infer YRest}`
        ? CompareLength<XRest, YRest>
        : Comparison.Greater
    : Y extends `${infer YFirst}${infer YRest}`
        ? Comparison.Lesser
        : Comparison.Equal;

type ComparePart<X extends string, Y extends string> = X extends `${infer XFirst extends number}${infer XRest}`
    ? Y extends `${infer YFirst extends number}${infer YRest}`
        ? ComparisonTable[XFirst][YFirst] extends infer Result
            ? Result extends Comparison.Equal
                ? ComparePart<XRest, YRest>
                : Result
            : never
        : ComparisonTable[XFirst][0]
    : Y extends `${infer YFirst extends number}${infer YRest}`
        ? ComparisonTable[0][YFirst]
        : Comparison.Equal;

type CompareInteger<X extends string, Y extends string> = CompareLength<X, Y> extends infer Result
    ? Result extends Comparison.Equal
        ? ComparePart<X, Y>
        : Result
    : never;

type Comparator<X extends number, Y extends number> = SignAndAbs<X> extends [infer SignX, infer IntegerX extends string, infer DecimalX extends string]
    ? SignAndAbs<Y> extends [infer SignY, infer IntegerY extends string, infer DecimalY extends string]
        ? SignX extends true
            ? SignY extends true
                ? CompareInteger<IntegerX, IntegerY> extends infer IntegerResult
                    ? IntegerResult extends Comparison.Equal
                        ? Invert<ComparePart<DecimalX, DecimalY>>
                        : Invert<IntegerResult>
                    : never
                : Comparison.Lesser
            : SignY extends true
                ? Comparison.Greater
                : CompareInteger<IntegerX, IntegerY> extends infer IntegerResult
                    ? IntegerResult extends Comparison.Equal
                        ? ComparePart<DecimalX, DecimalY>
                        : IntegerResult
                    : never
        : never
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lesser>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lesser>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lesser>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lesser>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lesser>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lesser>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lesser>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lesser>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lesser>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lesser>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
  Expect<Equal<Comparator<3.1415, 3.1415>, Comparison.Equal>>,
  Expect<Equal<Comparator<3.1415, 3.1414>, Comparison.Greater>>,
  Expect<Equal<Comparator<0, 3.1414>, Comparison.Lesser>>,
  Expect<Equal<Comparator<31.415, 3.1415>, Comparison.Greater>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/
  