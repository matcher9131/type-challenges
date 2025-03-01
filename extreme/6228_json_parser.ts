/*
  6228 - JSON Parser
  -------
  by Hydration (@hydrati) #extreme #template-literal #json

  ### Question

  You're required to implement a type-level partly parser to parse JSON string into a object literal type.

  Requirements:
   - `Numbers` and `Unicode escape (\uxxxx)` in JSON can be ignored. You needn't to parse them.

  > View on GitHub: https://tsch.js.org/6228
*/

/* _____________ Your Code Here _____________ */

type RemoveEscapeMap = {
    "\\r": "\r",
    "\\n": "\n",
    "\\b": "\b",
    "\\f": "\f"
};
type RemoveEscape<S extends string> = S extends `${infer First}${infer Second}${infer Rest}`
    ? `${First}${Second}` extends keyof RemoveEscapeMap
        ? `${RemoveEscapeMap[`${First}${Second}`]}${RemoveEscape<Rest>}`
        : `${First}${RemoveEscape<`${Second}${Rest}`>}`
    : S;

type Pure<T> = {
    [P in keyof T]: T[P] extends object ? Pure<T[P]> : T[P]
}

type SetProperty<T, K extends PropertyKey, V> = {
    [P in (keyof T) | K]: P extends K ? V : P extends keyof T ? T[P] : never
}

type WhiteSpace = " " | "\t" | "\n" | "\r";
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type TokenSymbol = "{" | "}" | "[" | "]" | ":" | ",";
type TokenString = { value: string; };
type Token = TokenSymbol | TokenString | true | false | null | Digit;
type Tokenize<T extends string, Q extends boolean = false, Current extends string = ""> = T extends `${infer First}${infer Rest}`
    ? First extends "\""
        ? Q extends true
            ? [{ value: Current }, ...Tokenize<Rest, false, "">]
            : Tokenize<Rest, true, "">
        : Q extends true
            ? Tokenize<Rest, true, `${Current}${First}`>
            : First extends WhiteSpace
                ? Tokenize<Rest>
                : First extends Number
                    ? [Number, ...Tokenize<Rest>]
                    : First extends TokenSymbol
                        ? [First, ...Tokenize<Rest>]
                        : T extends `null${infer NullRest}`
                            ? [null, ...Tokenize<NullRest>]
                            : T extends `true${infer TrueRest}`
                                ? [true, ...Tokenize<TrueRest>]
                                : T extends `false${infer FalseRest}`
                                    ? [false, ...Tokenize<FalseRest>]
                                    : never
    : [];

// [result, rest]
type ParseObjectInner<T extends Token[], Result = {}> = T extends ["}", ...infer Rest]
    ? [Result, Rest]
    : T extends [infer Key extends TokenString, ":", ...infer Rest extends Token[]]
        ? ParseLiteral<Rest> extends [infer Value, infer Rest2 extends Token[]]
            ? ParseObjectInner<
                Rest2 extends [",", ...infer Rest3 extends Token[]]
                    ? Rest3
                    : Rest2,
                SetProperty<Result, RemoveEscape<Key["value"]>, Value>
            >
            : [never, Rest]
        : [never, T];
type ParseArrayInner<T extends Token[], Result extends unknown[] = []> = T extends ["]", ...infer Rest]
    ? [Result, Rest]
    : ParseLiteral<T> extends [infer Value, infer Rest extends Token[]]
        ? ParseArrayInner<
            Rest extends [",", ...infer Rest2 extends Token[]]
                ? Rest2
                : Rest, 
            [...Result, Value]
        >
        : [never, T];
// [result, rest]
type ParseLiteral<T extends Token[]> = T extends [infer First, ...infer Rest extends Token[]]
    ? First extends "{"
        ? ParseObjectInner<Rest> extends [infer Value, infer Rest2]
            ? [Value, Rest2]
            : [never, Rest]
        : First extends "["
            ? ParseArrayInner<Rest> extends [infer Value, infer Rest2]
                ? [Value, Rest2]
                : [never, Rest]
            : First extends TokenString
                ? [RemoveEscape<First["value"]>, Rest]
                : First extends true | false | null
                    ? [First, Rest]
                    : [never, Rest]
    : [];

type Parse<T extends string> = Pure<ParseLiteral<Tokenize<T>>[0]>;


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<(
    Parse<`
      {
        "a": "b", 
        "b": false, 
        "c": [true, false, "hello", {
          "a": "b", 
          "b": false
        }], 
        "nil": null
      }
    `>
  ), (
    {
      nil: null
      c: [true, false, 'hello', {
        a: 'b'
        b: false
      }]
      b: false
      a: 'b'
    }

  )>>,
  Expect<Equal<Parse<'{}'>, {}>>,

  Expect<Equal<Parse<'[]'>, []>>,

  Expect<Equal<Parse<'[1]'>, never>>,

  Expect<Equal<Parse<'true'>, true>>,

  Expect<Equal<
  Parse<'["Hello", true, false, null]'>,
  ['Hello', true, false, null]
  >>,

  Expect<Equal<
  (
    Parse<`
      {
        "hello\\r\\n\\b\\f": "world"
      }`>
  ), (
    {
      'hello\r\n\b\f': 'world'
    }
  )
  >>,

  Expect<Equal<Parse<'{ 1: "world" }'>, never>>,

  Expect<Equal<Parse<`{ "hello
  
  world": 123 }`>, never>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6228/answer
  > View solutions: https://tsch.js.org/6228/solutions
  > More Challenges: https://tsch.js.org
*/
  