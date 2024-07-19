console.time("ready");

import { buildProblem } from "./build-problem";
import { buildStatement } from "./build-statement";
import { equations } from "./equations";
import { accordionify } from "./animate";
import { $ } from "./util";
import { renderStatement } from "./render";

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
  const render = renderStatement(statement);

  answer.innerHTML = render.answer;

  renderMathInElement(document.body, { fleqn: true });
  question.innerText = render.question;
  accordion.style.display = "block";
  questionHeader.style.display = "block";
  question.scrollIntoView({ behaviour: "smooth" });
}

window.push = push;
