import { AssignmentNode, evaluate, parse, resolve } from "mathjs";
import { constants, constantsNames } from "./constants";
import { names } from "./equations";
import { varDefs } from "./data";

export function renderStatement({ equation, given, iv, steps, vals, str }) {
  const parsedEqn = parse(equation);

  let runningVals = {};
  const transformed = parsedEqn.transform((node, _, parent) => {
    if (parent instanceof AssignmentNode) return node;

    if (node.isSymbolNode && runningVals[node.name])
      return runningVals[node.name];

    return node;
  });

  const latexify = (str) => `<p>$$${str}$$</p>`;

  let answer = [
    ...new Set(
      given
        .concat(iv)
        .map((v) => {
          if (varDefs[v]) return `<p>Let $${varDefs[v]}$ = ${names[v]}</p>`;
        })
        .filter(Boolean)
        .concat(
          steps
            .flatMap((step, i) => {
              const parsed = parse(step);
              const resolved = resolve(parsed.value, vals);

              const step2 = new AssignmentNode(parsed.object, resolved);
              runningVals[parsed.object.toString()] = resolved;

              return [
                parsed,
                i !== steps.length - 1 && step.toString() !== step2.toString()
                  ? step2
                  : null,
              ]
                .filter(Boolean)
                .map((step) => latexify(step.toTex()))
                .concat("<br>");
            })
            .concat(
              [
                parsedEqn.toTex(),
                transformed.toTex(),

                resolve(transformed, { ...constants, ...vals }).toTex(),

                new AssignmentNode(
                  parsedEqn.object,
                  parse(
                    evaluate(parsedEqn.value.toString(), {
                      ...constants,
                      ...vals,
                    }).toString(),
                  ),
                ).toTex(),
              ].map(latexify),
            ),
        ),
    ),
  ].join("");

  for (const k in varDefs)
    answer = answer.replaceAll(
      k.replaceAll("_", "\\_"),
      varDefs[k].replaceAll(" ", "\\ "),
    );
  for (const k in names)
    answer = answer.replaceAll(
      k.replaceAll("_", "\\_"),
      "\\mathrm{" + names[k].replaceAll(" ", "\\ ") + "}",
    );

  for (const k in constantsNames)
    answer = answer.replaceAll(k.replaceAll("_", "\\_"), constantsNames[k]);

  return { question: str, answer };
}
