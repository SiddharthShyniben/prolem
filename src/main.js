import { buildProblem } from "./build-problem";
import { buildStatement } from "./build-statement";
import { equations } from "./equations";
import { accordionify } from "./animate";
import { $, katexOpts } from "./util";
import { renderStatement } from "./render";
import "./test.js";

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

  if (window.__n_eq !== undefined) {
    console.log(
      "%cDEBUG:",
      "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;",
      equations[window.__n_eq],
    );
  }
  const problem = buildProblem(
    equations[window.__n_eq ?? Math.floor(Math.random() * equations.length)],
  );

  const statement = buildStatement(problem);
  const render = renderStatement(statement);

  answer.innerHTML = render.answer;
  question.innerText = render.question;
  renderMathInElement(answer, katexOpts);
  renderMathInElement(question, katexOpts);
  accordion.style.display = "block";
  questionHeader.style.display = "block";
  question.scrollIntoView({ behaviour: "smooth", block: "center" });
}

window.push = push;
