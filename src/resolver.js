import { buildProblem } from "./build-problem";
import { equations } from "./equations";

export function resolve(problem) {
  console.log("Resolving", problem);
}

resolve(buildProblem(equations[2], 2));
