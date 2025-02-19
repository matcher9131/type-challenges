/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */

type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : "";
type AddDigit<
    X extends number,
    Y extends number,
    CX extends unknown[] = [],
    CY extends unknown[] = []
> = CX["length"] extends X
    ? CY["length"] extends Y
        ? [...CX, ...CY]["length"]
        : AddDigit<X, Y, CX, [...CY, unknown]>
    : AddDigit<X, Y, [...CX, unknown], CY>
type Split<N extends number> = `${N}` extends `${infer Carry extends number}${infer Digit extends number}`
    ? [Carry, Digit]
    : `${N}` extends `${infer Digit extends number}`
        ? [0, Digit]
            : never;
type AddReversed<
    X extends string,
    Y extends string,
    Carry extends number = 0
> = X extends `${infer XFirst extends number}${infer XRest}`
    ? Y extends `${infer YFirst extends number}${infer YRest}`
        ? Split<AddDigit<AddDigit<XFirst, YFirst>, Carry>> extends [infer C extends number, infer D extends number]
            ? `${D}${AddReversed<XRest, YRest, C>}`
            : never
        : Split<AddDigit<XFirst, Carry>> extends [infer C extends number, infer D extends number]
            ? `${D}${AddReversed<XRest, "", C>}`
            : never
        : Y extends `${infer YFirst extends number}${infer YRest}`
            ? Split<AddDigit<YFirst, Carry>> extends [infer C extends number, infer D extends number]
                ? `${D}${AddReversed<"", YRest, C>}`
                : never
            : Carry extends 1
                ? "1"
                : "";
type Add<X extends number, Y extends number> = Reverse<AddReversed<Reverse<`${X}`>, Reverse<`${Y}`>>> extends `${infer T extends number}` ? T : never;

type Higher<N extends number> = Reverse<`${N}`> extends `${infer First}${infer Second}${infer Rest}`
    ? Rest extends `${infer RestFirst}${infer RestRest}`
        ? Reverse<`${Rest}`> extends `${infer T extends number}`
            ? T
            : never
        : 0
    : 0;
type Lower<N extends number> = Reverse<`${N}`> extends `${infer First}${infer Second}${infer Rest}`
    ? Second extends "0"
        ? `${First}` extends `${infer T extends number}`
            ? T
            : never
    : `${Second}${First}` extends `${infer T extends number}`
        ? T
        : never
    : N;

type Multiply<
    X extends number,
    Y extends number,
    CX extends unknown[] = [],
    CY extends unknown[] = [],
    Result extends unknown[] = []
> = CX["length"] extends X
    ? CY["length"] extends Y
        ? Result["length"]
        : Multiply<X, Y, CX, [...CY, unknown], [...Result, ...CX]>
    : Multiply<X, Y, [...CX, unknown], CY, Result>

type Abs<N extends number> = `${N}` extends `-${infer U extends number}` ? U : N;
type SquareHigher<N extends number> = `${Multiply<Higher<N>, Higher<N>>}0000` extends `${infer T extends number}` ? T : never;
type SquareMiddle<N extends number> = `${Multiply<Multiply<Higher<N>, Lower<N>>, 2>}00` extends `${infer T extends number}` ? T : never;
type SquareLower<N extends number> = Multiply<Lower<N>, Lower<N>>;
type SquareInner<N extends number> = Add<Add<SquareHigher<N>, SquareMiddle<N>>, SquareLower<N>>;
type Square<N extends number> = SquareInner<Abs<N>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,
  Expect<Equal<Square<101>, 10201>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27133/answer
  > View solutions: https://tsch.js.org/27133/solutions
  > More Challenges: https://tsch.js.org
*/
