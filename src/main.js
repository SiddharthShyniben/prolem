import {
  AssignmentNode,
  ConstantNode,
  SymbolNode,
  evaluate,
  parse,
  resolve,
  simplify,
} from "mathjs";
import { buildProblem } from "./build-problem";
import { buildStatement } from "./build-statement";
import { equations, names } from "./equations";
import { accordionify } from "./animate";
import { $ } from "./util";
import { constants, constantsNames, units } from "./data";

window.MathJax = {
  loader: { load: ["[tex]/ams"] },
  tex: {
    packages: { "[+]": ["ams"] },
    macros: {
      myexp: ["#1*10^{#2}", 2],
    },
  },
  chtml: {
    displayAlign: "left",
  },
};

const template = $("#block");

async function push() {
  const clone = template.content.cloneNode(true);

  const accordion = clone.querySelector(".solution"),
    panel = clone.querySelector(".panel"),
    question = clone.querySelector(".problem"),
    answer = clone.querySelector(".steps"),
    questionHeader = clone.querySelector(".qh");
  document.body.appendChild(clone);

  accordionify(accordion, panel);

  const problem = buildProblem(
    equations[Math.floor(Math.random() * equations.length)],
  );

  const statement = buildStatement(problem);
  // console.log({ problem, statement });
  // console.log(problem.steps.map((step) => parse(step).value));

  const parsedEqn = parse(problem.equation);
  console.log({ parsedEqn });

  let runningVals = {};
  let transformed;

  let compiled = [
    ...new Set(
      problem.steps
        .flatMap((step, i) => {
          const parsed = parse(step);
          const resolved = resolve(parsed.value, statement.vals);

          const step2 = new AssignmentNode(parsed.object, resolved);
          const step2str = step2.toString();
          runningVals[parsed.object.toString()] = resolved;
          console.log({ runningVals });

          return [
            parsed,
            i !== problem.steps.length - 1 && step.toString() !== step2str
              ? step2
              : null,
          ]
            .filter(Boolean)
            .map((step) => {
              let final =
                "<p>$$" + step.toTex({ parenthesis: "auto" }) + "$$</p>";
              return final;
            })
            .concat("<br>");
        })
        .concat([
          "<p>$$" + parsedEqn.toTex({ parenthesis: "auto" }) + "$$</p>",
          "<p>$$" +
            (transformed = parsedEqn.transform((node, path, parent) => {
              if (parent instanceof AssignmentNode) return node;
              if (node.isSymbolNode) {
                if (runningVals[node.name]) {
                  console.log(
                    "got",
                    { node, path, parent },
                    runningVals[node.name],
                  );
                  return runningVals[node.name];
                }
              }
              return node;
            })).toTex({ parenthesis: "auto" }) +
            "$$</p>",
          "<p>$$" +
            resolve(transformed, { ...constants, ...statement.vals }).toTex({
              parenthesis: "auto",
            }) +
            "$$</p>",
          "<p>$$" +
            new AssignmentNode(
              parsedEqn.object,
              parse(
                evaluate(parsedEqn.value.toString(), {
                  ...constants,
                  ...statement.vals,
                }).toString(),
              ),
            ).toTex({ parenthesis: "auto" }) +
            "$$</p>",
        ]),
    ),
  ].join("");

  for (const k in names)
    compiled = compiled.replaceAll(
      k.replaceAll("_", "\\_"),
      "\\mathrm{" + names[k].replaceAll(" ", "\\ ") + "}",
    );

  for (const k in constantsNames)
    compiled = compiled.replaceAll(k.replaceAll("_", "\\_"), constantsNames[k]);

  answer.innerHTML = compiled;

  await MathJax.typesetPromise();
  question.innerText = statement.str;
  accordion.style.display = "block";
  questionHeader.style.display = "block";
  question.scrollIntoView();
}

window.push = push;
document.addEventListener("DOMContentLoaded", push);
