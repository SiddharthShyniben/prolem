import { generators, units } from "./data";
import { names } from "./equations";
import { getRandomInt } from "./util";

export function buildStatement({ find, given, steps, equation, iv }) {
  const vals = {};
  for (const k of given) vals[k] = generators[k]?.() || getRandomInt(1, 15);

  return {
    str: [...given, find].map((item) => names[item](vals[item])).join(". "),
    vals,

    find,
    given,
    steps,
    equation,
    iv,
  };
}
