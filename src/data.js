import { constants } from "./constants";
import { getRandomInt, inTermsOf, shortNamesInTermsOf } from "./util";

export const generators = {
  temp_celsius: () => getRandomInt(-500, 500),
  temp_kelvin: () => getRandomInt(1, 1000),
  temp_fahrenheit: () => getRandomInt(-500, 500),

  mole_molecules_solute: () => getRandomInt(1, 100),
  mole_molecules_solvent: () => getRandomInt(1, 100) * 2,
  Xa: () => Math.round(Math.random() * 100) / 100,
  Xb: () => Math.round(Math.random() * 100) / 100,
  moles_a: () => getRandomInt(1, 100),
  moles_b: () => getRandomInt(1, 100),
  volume_solvent: () => (22.4 * getRandomInt(1, 200)) / 2,
  ...inTermsOf(["def", "a", "b", "solvent", "solute"], {
    moles_molecules: () => getRandomInt(1, 100),
    volm: () => getRandomInt(1, 100),
    n_molecules: () =>
      Math.round(getRandomInt(1, 100) * +constants.Na * 100) / 100,
    n_atoms: () => Math.round(getRandomInt(1, 200) * +constants.Na * 100) / 100,
    mole_atoms: () => getRandomInt(1, 100),
    atoms_per_molecule: () =>
      [2, 2, 2, 2, 2, 5, 8][Math.floor(Math.random() * 7)],
    weight: () => getRandomInt(1, 1000) / 10,
    mass_atoms: () => getRandomInt(1, 100),
    mass_molecules: () => getRandomInt(1, 100),
    mass_one_atom: () =>
      Math.round((100 * getRandomInt(1, 100)) / constants.Na) / 100,
    mass_one_molecule: () =>
      Math.round((100 * getRandomInt(1, 100)) / constants.Na) / 100,
    mass_percent: () => Math.floor(Math.random() * 10000) / 100,
    mass_solute: () => getRandomInt(1, 100),
    mass_solvent: () => getRandomInt(1, 100),
    vapor_density: () => getRandomInt(1, 100),
    mass_percent: () => getRandomInt(1, 99),
  }),
};

export const varDefs = {
  molality: "m",
  molarity: "M",
  a_moles_molecules: "n_a",
  b_moles_molecules: "n_b",

  ...shortNamesInTermsOf(["ab", "solution", "a", "b", "solute", "solvent"], {
    weight: "W[_{$}]",
    moles_molecules: "n[_{$}]",
    volm: "V[_{$}]",
    n_molecules: "M[_{$}]",
    n_atoms: "N[_{$}]",
  }),

  temp_celsius: "t_C",
  temp_kelvin: "t_K",
  temp_fahrenheit: "t_F",
};
