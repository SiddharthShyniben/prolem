import { constants, massTable } from "./constants";
import { getRandomInt, hasSameElements } from "./util";

export const analogies = [
  ({ find, given }) => {
    if (
      find == "mass_molecules" &&
      hasSameElements(given, ["n_molecules", "n_atoms", "mass_atoms"])
    ) {
      const x = getRandomInt(1, 100);
      const y = x * getRandomInt(1, 50);
      const z = getRandomInt(1, 50);
      return {
        vals: {
          mass_atoms: z,
          n_atoms: y + "Na",
          n_molecules: x + "Na",
        },
        str:
          Math.random() > 0.5
            ? `A container filled with some substance is found to have ${x}Na molecules and ${y}Na atoms. If the mass of one mole atoms of the substance is ${z}g, find the mass of one mole molecules of the substance`
            : `One student measures the number of atoms in a given measure of a subtance to be ${y}Na. Another student finds the number of molecules in the substance to be ${x}Na. If the gram atomic mass of the subtance is ${z}g, find the gram molecular mass of the substance`,
      };
    }
  },
  ({ find, given }) => {
    if (
      find == "molality" &&
      hasSameElements(given, [
        "mole_molecules_solvent",
        "mole_molecules_solute",
      ])
    ) {
      const x = getRandomInt(1, 100);
      const y = getRandomInt(1, 50) + getRandomInt(1, x);
      return {
        vals: {
          mole_molecules_solute: x,
          mole_molecules_solvent: y,
        },
        str:
          Math.random() > 0.5
            ? `A given solution is prepared by mixing ${x}mol solute in ${y}mol solvent. Find it's molality`
            : `${x}mol of a sugar like compound is mixed in ${y}mol water. Find it's molality`,
      };
    }
  },
  ({ find, given }) => {
    if (
      find == "mole_atoms" &&
      hasSameElements(given, ["weight", "mass_atoms"])
    ) {
      const el = massTable[Math.floor(Math.random() * massTable.length)];
      const x = (getRandomInt(1, 1000) * el[1]) / 10;

      return {
        vals: {
          weight: x,
          mass_atoms: el[1],
        },
        str:
          Math.random() > 0.5
            ? `A sample of ${el[0]} weighs ${x}g. Find the number of mole atoms in it`
            : `A sample of a substance whose atomic mass is ${el[1]} weights ${x}g. Find the amount of atoms in mol`,
      };
    }
  },
  ({ find, given }) => {
    if (find == "n_atoms" && hasSameElements(given, ["weight", "mass_atoms"])) {
      const el = massTable[Math.floor(Math.random() * massTable.length)];
      const x = (getRandomInt(1, 1000) * el[1]) / 10;
      const y = el[1];

      return {
        vals: {
          weight: x,
          mass_atoms: y,
          Na: constants.Na,
        },
        str:
          Math.random() > 0.5
            ? `A sample of a mineral weighs ${x}g. If the molar mass of this mineral is ${y} grams per mole, how many mineral atoms are in the sample?`
            : `Find the number of atoms in an ${x}g vial of ${el[0]}`,
      };
    }
  },
  ({ find, given }) => {
    if (
      find == "mass_one_molecule" &&
      hasSameElements(given, ["weight", "n_molecules"])
    ) {
      const el = massTable[Math.floor(Math.random() * massTable.length)];
      const y = getRandomInt(1, 100);
      const x = (y * getRandomInt(1, 1000) * el[1]) / 10;

      return {
        vals: {
          weight: x,
          n_molecules: y + "Na",
        },
        str: `If ${x}g of a substance has ${y}Na molecules, find the mass of one molecule of the substance`,
      };
    }
  },
  ({ find, given }) => {
    if (
      find == "n_molecules" &&
      hasSameElements(given, [
        "n_atoms",
        "mass_atoms",
        "moles_molecules",
        "weight",
      ])
    ) {
    }
  },
];
