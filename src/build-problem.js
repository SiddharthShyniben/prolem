import nerdamer from "nerdamer/nerdamer.core";
import "nerdamer/Algebra";
import "nerdamer/Calculus";
import "nerdamer/Solve";

import { simplify } from "mathjs";
import { equations } from "./equations.js";

export function buildProblem(equation) {
  const find =
    equation.variables[Math.floor(Math.random() * equation.variables.length)];

  const problem = {
    equation: nerdamer(equation.equation).solveFor(find).toString(),
    find,
    iv: [],
  };

  problem.steps = [
    find === equation.variables[0] ? null : equation.equation,
    find + " = " + simplify(problem.equation, { exactFractions: true }),
  ].filter(Boolean);
  problem.given = [
    ...new Set(
      equation.variables
        .filter((variable) => variable !== find)
        .flatMap((variable) => {
          const otherEquation = equations.find(
            (other) =>
              other.equation !== equation.equation &&
              other.variables.includes(variable) &&
              !other.variables.includes(find),
          );

          if (otherEquation) {
            const equated = simplify(
              nerdamer(otherEquation.equation).solveFor(variable).toString(),
              { exactFractions: true },
            ).toString();

            problem.steps.push(
              variable + " = " + simplify(equated, { exactFractions: true }),
            );
            problem.equation = problem.equation.replace(
              variable,
              `(${equated})`,
            );

            problem.iv.push(...otherEquation.variables);
            return otherEquation.variables.filter(
              (otherVariable) =>
                otherVariable !== variable && otherVariable !== find,
            );
          }
          return variable;
        }),
    ),
  ];

  problem.equation =
    find + " = " + simplify(problem.equation, { exactFractions: true });
  return problem;
}
