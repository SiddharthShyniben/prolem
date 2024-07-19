import nerdamer from "nerdamer/nerdamer.core";
import "nerdamer/Algebra";
import "nerdamer/Calculus";
import "nerdamer/Solve";

import { simplify } from "mathjs";
import { equations } from "./equations.js";
import { equate, simplifyOptions } from "./util.js";

export function buildProblem({ equation, variables }) {
  const find = variables[Math.floor(Math.random() * variables.length)];
  let eq = nerdamer(equation).solveFor(find).toString();

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
            ).toString();

            steps.push(equate(variable, simplify(equated, simplifyOptions)));
            eq = eq.replace(variable, `(${equated})`);

            return otherEquation.variables.filter(
              (otherVariable) =>
                otherVariable !== variable && otherVariable !== find,
            );
          }
          return variable;
        }),
    ),
  ];

  return {
    find,
    equation: equate(find, simplify(eq, simplifyOptions)),
    steps,
    given,
  };
}
