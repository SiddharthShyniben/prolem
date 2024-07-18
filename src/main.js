import { AssignmentNode, ConstantNode, parse, resolve, simplify } from "mathjs";
import { buildProblem } from "./build-problem";
import { buildStatement } from "./build-statement";
import { equations } from "./equations";

const problem = buildProblem(
  equations[Math.floor(Math.random() * equations.length)],
);

const statement = buildStatement(problem);
console.log({ problem, statement });
console.log(problem.steps.map((step) => parse(step).value));

const question = document.querySelector("#problem");
const answer = document.querySelector("#steps");
question.innerText = statement.str;
answer.innerHTML = [
  ...new Set(
    problem.steps.flatMap((step) => {
      const parsed = parse(step);
      const resolved = resolve(parsed.value, statement.vals);
      const simplified = simplify(resolved);

      const step2 = new AssignmentNode(parsed.object, resolved).toString();
      const step3 = new AssignmentNode(parsed.object, simplified).toString();
      return [
        `<p>${step}</p>`,
        step.toString() !== step2 ? `<p>${step2}` : null,
        step2 !== step3 ? `<p>${step3}</p>` : null,
        "<br>",
      ].filter(Boolean);
    }),
  ),
].join("");

