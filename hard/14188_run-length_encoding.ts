/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

namespace RLE {
    type Length<S extends string, C extends unknown[] = []> = S extends `${infer First}${infer Rest}`
        ? Length<Rest, [...C, unknown]>
        : C["length"];
    type Repeat<S extends string, N extends number, C extends unknown[] = []> = C["length"] extends N
        ? ""
        : `${S}${Repeat<S, N, [...C, unknown]>}`;

    type EncodeInner<S extends string, Buffer extends string[] = []> = S extends `${infer SFirst}${infer SRest}`
        ? Buffer extends [infer BFirst extends string, ...infer BRest]
            ? SFirst extends BFirst
                ? EncodeInner<SRest, [...Buffer, SFirst]>
                : `${Buffer["length"] extends 1 ? "" : Buffer["length"]}${BFirst}${EncodeInner<SRest, [SFirst]>}`
            : EncodeInner<SRest, [SFirst]>
        : Buffer extends [infer BFirst extends string, ...infer BRest]
            ? `${Buffer["length"] extends 1 ? "" : Buffer["length"]}${BFirst}`
            : "";
    export type Encode<S extends string> = EncodeInner<S>;

    type DecodeInner<S extends string, C extends number = 1> = S extends `${infer First}${infer Rest}`
        ? First extends `${infer N extends number}`
            ? DecodeInner<Rest, N>
            : `${Repeat<First, C>}${DecodeInner<Rest, 1>}`
        : "";
    export type Decode<S extends string> = DecodeInner<S>;
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/
  