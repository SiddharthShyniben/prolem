import nerdamer from "nerdamer/nerdamer.core";
import "nerdamer/Algebra";
import "nerdamer/Calculus";
import "nerdamer/Solve";

import { parse, simplify } from "mathjs";
import { equations } from "./equations.js";
import { equate, simplifyOptions } from "./util.js";
import { conditions } from "./conditions.js";

export function buildProblem({ equation, variables }) {
  const find =
    variables[window.__n_v ?? Math.floor(Math.random() * variables.length)];

  if (window.__n_eq !== undefined) {
    console.log(
      "%cDEBUG:",
      "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;",
      "find:",
      find,
    );
  }

  let eq = nerdamer(equation).solveFor(find).toString();

  if (window.__n_eq !== undefined) {
    console.log(
      "%cDEBUG:",
      "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;",
      "find:",
      eq,
    );
  }

  // Intermediate variables
  const iv = [];

  const steps = [
    find === variables[0] ? null : equation,
    equate(find, simplify(eq, simplifyOptions)),
  ].filter(Boolean);

  const given = [
    ...new Set(
      variables
        .filter((variable) => variable !== find)
        .flatMap((variable) => {
          const otherEquation = equations.find(
            (other) =>
              other.equation !== equation &&
              other.variables.includes(variable) &&
              !other.variables.includes(find),
          );

          if (otherEquation) {
            const equated = simplify(
              nerdamer(otherEquation.equation).solveFor(variable).toString(),
              simplifyOptions,
            );

            steps.push(equate(variable, simplify(equated, simplifyOptions)));
            eq = parse(eq)
              .transform((node) => {
                if (node.isSymbolNode && node.name === variable) return equated;
                return node;
              })
              .toString();

            iv.push(variable);

            return otherEquation.variables.filter(
              (otherVariable) =>
                otherVariable !== variable && otherVariable !== find,
            );
          }

          return variable;
        }),
    ),
  ];

  if (window.__n_eq !== undefined) {
    console.log(
      "%cDEBUG:",
      "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;",
      "given:",
      given,
    );
  }

  if (conditions[find] && !conditions[find](given))
    return buildProblem({ equation, variables });

  return {
    find,
    equation: equate(find, simplify(eq, simplifyOptions)),
    steps,
    given,
    iv: iv.sort(),
  };
}
