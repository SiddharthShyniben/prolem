import { constants } from "./constants";

export const $ = (...args) => document.querySelector(...args);

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive

export const hasSameElements = (arr1, arr2) =>
  arr1.length == arr2.length && arr2.every((item) => arr1.includes(item));

export const eq = (equation) =>
  equation.equation
    ? equation
    : {
        equation: equation.split(" --- ")[0],
        variables: [...equation.matchAll(/[A-z_]+/g)]
          .map((x) => x[0])
          .filter((x) => !["e", ...Object.keys(constants)].includes(x)),
      };

export function eqsInTermsOf(prefixes, ...eqs) {
  const equations = [];

  for (const prefix of ["def", ...prefixes])
    for (const equation of eqs)
      equations.push(eq(equation.replaceAll("[]", prefix)));

  return equations;
}

export function shortNamesInTermsOf(prefixes, object) {
  return Object.assign(
    Object.fromEntries(
      Object.entries(object).map(([a, b]) => [
        "def_" + a,
        b.replace(/\[.*?\]/g, ""),
      ]),
    ),
    ...prefixes.map((pre) =>
      Object.fromEntries(
        Object.entries(object).map(([a, b]) => [
          pre + "_" + a,
          b
            .replace(/[\[\]]/g, "")
            .replaceAll("$", pre.length === 1 ? pre.toUpperCase() : pre),
        ]),
      ),
    ),
  );
}

export function namesInTermsOf(prefixes, object) {
  return Object.assign(
    Object.fromEntries(
      Object.entries(object).map(([a, b]) => ["def_" + a, b()]),
    ),
    ...prefixes.map((pre) =>
      Object.fromEntries(
        Object.entries(object).map(([a, b]) => [pre + "_" + a, b(pre)]),
      ),
    ),
  );
}

export const inTermsOf = (prefixes, object) =>
  Object.assign(
    ...prefixes.map((pre) =>
      Object.fromEntries(
        Object.entries(object).map(([a, b]) => [pre + "_" + a, b]),
      ),
    ),
  );

export const equate = (a, b) => a + " = " + b;
export const simplifyOptions = { exactFractions: true };
export const katexOpts = {
  fleqn: true,
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
  ],
};

export const debugLog = (...msg) =>
  false &&
  console.log(
    "%cDEBUG:",
    "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;",
    ...msg,
  );
