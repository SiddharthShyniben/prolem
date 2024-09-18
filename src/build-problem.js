import nerdamer from "nerdamer/nerdamer.core";
import "nerdamer/Algebra";
import "nerdamer/Calculus";
import "nerdamer/Solve";

import { parse, simplify } from "mathjs";
import { equations } from "./equations.js";
import { debugLog, equate, simplifyOptions } from "./util.js";
import { conditions } from "./conditions.js";

export function buildProblem({ equation, variables }, difficulty = 1) {
  const find =
    variables[window.__n_v ?? Math.floor(Math.random() * variables.length)];

  let eq = nerdamer(equation).solveFor(find).toString();

  if (window.__n_eq !== undefined) debugLog("find:", find);
  if (window.__n_eq !== undefined) debugLog("equation:", eq);

  // Intermediate variables
  const iv = [];
  const ie = [];

  const steps = [
    find === variables[0] ? null : equation,
    equate(find, simplify(eq, simplifyOptions)),
  ].filter(Boolean);

  // Track all given variables across recursive substitutions
  let given = variables.filter((v) => v !== find);

  const processVariable = (variable) => {
    debugLog("processing variable", { variable });
    const otherEquation = equations.find(
      (other) =>
        !iv.includes(variable) &&
        other.equation !== equation &&
        !ie.includes(other.equation) &&
        other.variables.includes(variable) &&
        !other.variables.includes(find),
    );

    if (otherEquation) {
      ie.push(otherEquation.equation);
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

      // Return variables from the other equation excluding the find
      return otherEquation.variables.filter(
        (otherVariable) => otherVariable !== variable && otherVariable !== find,
      );
    }

    return variable;
  };

  const recursiveSubstitute = (currentDifficulty) => {
    debugLog("recursive substitute", { currentDifficulty });
    if (currentDifficulty <= 0) return;

    // Update `given` for each variable substitution
    const tempGiven = [
      ...new Set(given.flatMap((variable) => processVariable(variable))),
    ];

    if (window.__n_eq !== undefined)
      debugLog(" ".repeat(4 * currentDifficulty), given);

    if (conditions[find] && !conditions[find](given)) {
      return;
    }

    given = tempGiven;

    debugLog(JSON.stringify({ find, given, iv }, null, 2));

    // Recurse for the next level of difficulty
    recursiveSubstitute(currentDifficulty - 1);
  };

  // Start recursive substitutions based on difficulty level
  recursiveSubstitute(difficulty);

  return {
    find,
    equation: equate(find, simplify(eq, simplifyOptions)),
    steps,
    given: [...new Set(given)].sort(), // Ensure unique `given` values
    iv: iv.filter((a) => !given.includes(a)).sort(),
  };
}
