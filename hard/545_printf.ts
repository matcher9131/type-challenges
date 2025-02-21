/*
  545 - printf
  -------
  by null (@Bestmain-YS) #hard #template-literal

  ### Question

  Implement `Format<T extends string>` generic.

  For example,

  ```ts
  type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
  type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
  type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
  type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string
  ```

  > View on GitHub: https://tsch.js.org/545
*/

/* _____________ Your Code Here _____________ */

type ControlsMap = {
    s: string;
    d: number;
}
type ParsePrintFormat<S extends string, Pre extends boolean = false> = S extends `${infer First}${infer Rest}`
    ? Pre extends true
        ? First extends keyof ControlsMap
            ? [ControlsMap[First], ...ParsePrintFormat<Rest, false>]
            : ParsePrintFormat<Rest, false>
        : First extends "%"
            ? ParsePrintFormat<Rest, true>
            : ParsePrintFormat<Rest, false>
    : [];
type Currying<T extends unknown[]> = T extends [infer First, ...infer Rest]
    ? (x: First) => Currying<Rest>
    : string;

type Format<T extends string> = ParsePrintFormat<T> extends []
    ? string
    : Currying<ParsePrintFormat<T>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/545/answer
  > View solutions: https://tsch.js.org/545/solutions
  > More Challenges: https://tsch.js.org
*/
