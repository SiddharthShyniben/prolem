import { buildProblem } from "./build-problem";
import { buildStatement } from "./build-statement";
import { equations } from "./equations";
import { accordionify } from "./animate";
import { $ } from "./util";
import { renderStatement } from "./render";

window.MathJax = {
  tex: {
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
  const render = renderStatement(statement);

  answer.innerHTML = render.answer;

  await MathJax.typesetPromise();
  question.innerText = render.question;
  accordion.style.display = "block";
  questionHeader.style.display = "block";
  question.scrollIntoView();
}

window.push = push;
document.addEventListener("DOMContentLoaded", push);
