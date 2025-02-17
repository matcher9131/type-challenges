/*
  9616 - Parse URL Params
  -------
  by Anderson. J (@andersonjoseph) #medium #infer #string #template-literal

  ### Question

  You're required to implement a type-level parser to parse URL params string into an Union.

  ```ts
  ParseUrlParams<':id'> // id
  ParseUrlParams<'posts/:id'> // id
  ParseUrlParams<'posts/:id/:user'> // id | user
  ```

  > View on GitHub: https://tsch.js.org/9616
*/

/* _____________ Your Code Here _____________ */

type ParseUrlParamsInner<T extends string, Result extends string, Current extends string, IsParam extends boolean>
    = T extends `${infer First}${infer Rest}`
        ? First extends "/"
            ? Current extends ""
                ? ParseUrlParamsInner<Rest, Result, "", false>
                : ParseUrlParamsInner<Rest, Result | Current, "", false>
            : First extends ":"
                ? ParseUrlParamsInner<Rest, Result, "", true>
                : IsParam extends true
                    ? ParseUrlParamsInner<Rest, Result, `${Current}${First}`, true>
                    : ParseUrlParamsInner<Rest, Result, "", false>
        : Current extends ""
            ? Result
            : Result | Current;
type ParseUrlParams<T extends string> = ParseUrlParamsInner<T, never, "", false>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9616/answer
  > View solutions: https://tsch.js.org/9616/solutions
  > More Challenges: https://tsch.js.org
*/
