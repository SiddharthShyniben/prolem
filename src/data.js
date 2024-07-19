import { getRandomInt, inTermsOf } from "./util";

export const massTable = [
  ["hydrogen", 2],
  ["helium", 4],
  ["lithium", 7],
  ["beryllium", 13],
  ["boron", 11],
  ["carbon", 12],
  ["nitrogen", 14],
  ["oxygen", 16],
  ["fluorine", 19],
  ["neon", 20],
  ["sodium", 23],
];

export const units = {
  temp_celsius: "°C",
  temp_kelvin: "K",
  temp_fahrenheit: "°F",
  mole_molecules_solute: "mol",
  mole_molecules_solvent: "mol",
  moles_a: "mol",
  moles_b: "mol",
  volume_solvent: "L",

  ...inTermsOf(["def", "a", "b", "solute", "solvent"], {
    moles_molecules: "mol",
    volm: "L",
    mole_atoms: "mol",
    weight: "g",
    mass_atoms: "g/mol",
    mass_molecules: "g/mol",
    mass_one_atom: "g",
    mass_one_molecule: "g",
    mass_solute: "g",
    mass_solvent: "g",
  }),
};

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
    n_molecules: () => getRandomInt(1, 100) * +constants.Na,
    n_atoms: () => getRandomInt(1, 200) * +constants.Na,
    mole_atoms: () => getRandomInt(1, 100),
    atoms_per_molecule: () =>
      [2, 2, 2, 2, 2, 5, 8][Math.floor(Math.random() * 7)],
    weight: () => getRandomInt(1, 1000) / 10,
    mass_atoms: () => getRandomInt(1, 100),
    mass_molecules: () => getRandomInt(1, 100),
    mass_one_atom: () => getRandomInt(1, 100) / constants.Na,
    mass_one_molecule: () => getRandomInt(1, 100) / constants.Na,
    mass_percent: () => Math.floor(Math.random() * 100),
    mass_solute: () => getRandomInt(1, 100),
    mass_solvent: () => getRandomInt(1, 100),
    vapor_density: () => getRandomInt(1, 100),
    mass_percent: () => getRandomInt(1, 99),
  }),
};

export const constants = {
  Na: 6.022e23,
  planck_constant: 6.626e-34,
  speed_of_light: 3e8,
  ME: 9.1094e-31,
  PI: Math.PI,
  rydberg_constant: 2.18e-18,
};

export const constantsNames = {
  Na: "N_A",
  plancks_constant: "\\textstyle{h}",
  speed_of_light: "c",
  ME: "m_e",
  PI: "\\pi",
  rydberg_constant: "R_\\text{H}",
};
