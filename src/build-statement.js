import { constants, generators, units } from "./data";
import { names } from "./equations";
import { getRandomInt } from "./util";
import { analogies } from "./writers";

export function buildStatement({ find, given }) {
  let q = analogies.find((fn) => fn({ find, given }));
  if (q) return q({ find, given });

  const vals = {};
  for (const k of given) vals[k] = generators[k]?.() || getRandomInt(1, 15);
  return {
    str:
      `Find the ${names[find] || find}, if ` +
      given
        .map(
          (item, i) =>
            `${i === given.length - 1 && given.length > 1 ? "and " : ""}${names[item] || item} is ${vals[item]}${units[item] || ""}`,
        )
        .join(", "),
    find,
    given,
    vals,
  };
}
