import { generators, units } from "./data";
import { names } from "./equations";
import { getRandomInt } from "./util";
import { analogies } from "./writers";

export function buildStatement({ find, given, steps, equation }) {
  let writer = analogies.find((fn) => fn({ find, given }));
  if (writer) return writer({ find, given });

  const vals = {};
  for (const k of given) vals[k] = generators[k]?.() || getRandomInt(1, 15);

  const surround = (text) => {
    const s = names[text].includes("_") || names[text].length === 1 ? "$" : "";
    return s + names[text] + s;
  };

  return {
    str:
      `Find the ${surround(find)}, if ` +
      given
        .map(
          (item, i) =>
            `${i === given.length - 1 && given.length > 1 ? "and " : ""}${surround(item)} is ${vals[item]}${units[item] || ""}`,
        )
        .join(", "),
    vals,

    find,
    given,
    steps,
    equation,
  };
}
