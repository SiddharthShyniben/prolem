import { equations, names } from "./equations";

function test() {
  console.time("test");

  const namesKeys = Object.keys(names);
  let i = 0;
  for (const k of namesKeys) {
    const f = namesKeys.filter((key) => key.includes(k));
    if (f.length > 1) {
      console.error({ k, f });
      i++;
    }
  }

  let j = 0;
  for (const equation of equations) {
    if (equation.variables.includes("planck_constant")) throw equation;
    for (const variable of equation.variables) {
      if (!names[variable]) {
        console.error(`Missing name for ${variable}`, equation);
        j++;
      }
    }
  }

  console.log(i, "overlaps found");
  console.log(j, "missing names");

  console.timeEnd("test");
}

window.test = test;
