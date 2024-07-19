import { constants } from "./constants";
import { getRandomInt, inTermsOf } from "./util";

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
