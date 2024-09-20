import {
  eq,
  eqsInTermsOf,
  namesInTermsOf,
  shortNamesInTermsOf,
} from "../../util";

// TODO:amu

export const chemCh1Equations = [
  "temp_kelvin = temp_celsius + 273",
  "temp_fahrenheit = (9 * temp_celsius / 5) + 32",

  "Xa = 1 - Xb",
  "Xa = a_moles_molecules / (a_moles_molecules + b_moles_molecules)",
  "Xb = b_moles_molecules / (a_moles_molecules + b_moles_molecules)",

  "molality = solute_moles_molecules / solvent_moles_molecules",
  "molarity = solute_moles_molecules / solvent_volm",

  ...eqsInTermsOf(
    ["a", "b", "solute", "solvent", "solution"],
    "[]_n_molecules = []_moles_molecules * Na",
    "[]_n_atoms = []_mole_atoms * Na",
    "[]_atoms_per_molecule = []_n_atoms / []_n_molecules",
    "[]_mole_atoms = []_weight / []_mass_atoms",
    "[]_moles_molecules = []_weight / []_mass_molecules",
    "[]_mass_one_atom = []_mass_atoms / Na",
    "[]_mass_one_molecule = []_mass_molecules / Na",
    "[]_mass_molecules = 2 * []_vapor_density",
  ),

  ...eqsInTermsOf(
    ["gas_a", "gas_b", "gas_solute", "gas_solvent", "gas_solution"],
    "[]_n__molecules = []_moles__molecules * Na",
    "[]_n__atoms = []_mole__atoms * Na",
    "[]_atoms__per_molecule = []_n__atoms / []_n__molecules",
    "[]_mole__atoms = []_w_eight / []_mass__atoms",
    "[]_moles__molecules = []_w_eight / []_mass__molecules",
    "[]_mass__one_atom = []_mass__atoms / Na",
    "[]_mass__one_molecule = []_mass__molecules / Na",
    "[]_mass__molecules = 2 * []_vapor__density",
    "[]_moles__molecules = []_v_olm / 22.4",
  ),

  "ab__weight = a_weight + b_weight",
  "a_mass_percent = a_weight * 100 / ab__weight",
  "b_mass_percent = b_weight * 100 / ab__weight",

  "solution_weight = solvent_weight + solute_weight",
  "solute_mass_percent = solute_weight * 100 / solution_weight",
  "solvent_mass_percent = solvent_weight * 100 / solution_weight",
].map(eq);

const names = {
  gas_a: "gas A",
  gas_b: "gas B",
  gas_solute: "gaseous solute",
  gas_solvent: "gaseous solvent",
  gas_solution: "gaseous solution",
};

const _fix = (suffix) =>
  names[suffix] ??
  (suffix.length == 1
    ? suffix.toUpperCase()
    : suffix === "ab"
      ? "a solution of A and B"
      : suffix);

export const chemCh1Names = Object.assign(
  namesInTermsOf(["a", "b", "solute", "solvent", "solution"], {
    moles_molecules:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The amount of molecules of ${_fix(suffix)} is ${value}mol`
          : `How much molecules of ${_fix(suffix)} are there, in moles?`,
    volm:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The volume of ${_fix(suffix)} is ${value}L`
          : `What is the volume of ${_fix(suffix)} in liters?`,
    n_molecules:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The number of molecules of ${_fix(suffix)} is ${value}`
          : `How many molecules of ${_fix(suffix)} are there, in moles?`,
    n_atoms:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The number of atoms of ${_fix(suffix)} is ${value}`
          : `How many atoms of ${_fix(suffix)} are there, in moles?`,
    mole_atoms:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The amount of atoms of ${_fix(suffix)} is ${value}mol`
          : `How many atoms of ${_fix(suffix)} are there, in moles?`,
    atoms_per_molecule:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The number of atoms in a molecule of ${_fix(suffix)} is ${value}`
          : `How many atoms are there in each molecule of ${_fix(suffix)}?`,
    weight:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The weight of ${_fix(suffix)} is ${value}g`
          : `How much weight does ${_fix(suffix)} have?`,
    mass_atoms:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The mass of one mole atom of ${_fix(suffix)} is ${value}g`
          : `What is the mass of one mole atom of ${_fix(suffix)}?`,
    mass_molecules:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The mass of one mole molecule of ${_fix(suffix)} is ${value}g`
          : `What is the mass of one mole molecule of ${_fix(suffix)}?`,
    mass_one_atom:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The mass of one atom of ${_fix(suffix)} is ${value}g`
          : `What is the mass of one atom of ${_fix(suffix)}?`,
    mass_one_molecule:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The mass of one molecule of ${_fix(suffix)} is ${value}g`
          : `What is the mass of one molecule of ${_fix(suffix)}?`,
    mass_solute:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The mass of the solute in ${_fix(suffix)} is ${value}g`
          : `What is the mass of the solute in ${_fix(suffix)}?`,
    mass_solvent:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The mass of the solvent in ${_fix(suffix)} is ${value}g`
          : `What is the mass of the solvent in ${_fix(suffix)}?`,
    vapor_density:
      (suffix = "substance") =>
      (value) =>
        value
          ? `The vapor density of ${_fix(suffix)} is ${value}g`
          : `What is the vapor density of ${_fix(suffix)}?`,
  }),
  namesInTermsOf(
    ["gas_a", "gas_b", "gas_solute", "gas_solvent", "gas_solution"],
    {
      moles__molecules:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The amount of molecules of ${_fix(suffix)} is ${value}mol`
            : `How much molecules of ${_fix(suffix)} are there, in moles?`,
      v_olm:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The volume of ${_fix(suffix)} is ${value}L`
            : `What is the volume of ${_fix(suffix)} in liters?`,
      n__molecules:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The number of molecules of ${_fix(suffix)} is ${value}`
            : `How many molecules of ${_fix(suffix)} are there, in moles?`,
      n__atoms:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The number of atoms of ${_fix(suffix)} is ${value}`
            : `How many atoms of ${_fix(suffix)} are there, in moles?`,
      mole__atoms:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The amount of atoms of ${_fix(suffix)} is ${value}mol`
            : `How many atoms of ${_fix(suffix)} are there, in moles?`,
      atoms__per_molecule:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The number of atoms in a molecule of ${_fix(suffix)} is ${value}`
            : `How many atoms are there in each molecule of ${_fix(suffix)}?`,
      w_eight:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The weight of ${_fix(suffix)} is ${value}g`
            : `How much weight does ${_fix(suffix)} have?`,
      mass__atoms:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The mass of one mole atom of ${_fix(suffix)} is ${value}g`
            : `What is the mass of one mole atom of ${_fix(suffix)}?`,
      mass__molecules:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The mass of one mole molecule of ${_fix(suffix)} is ${value}g`
            : `What is the mass of one mole molecule of ${_fix(suffix)}?`,
      mass__one_atom:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The mass of one atom of ${_fix(suffix)} is ${value}g`
            : `What is the mass of one atom of ${_fix(suffix)}?`,
      mass__one_molecule:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The mass of one molecule of ${_fix(suffix)} is ${value}g`
            : `What is the mass of one molecule of ${_fix(suffix)}?`,
      mass__solute:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The mass of the solute in ${_fix(suffix)} is ${value}g`
            : `What is the mass of the solute in ${_fix(suffix)}?`,
      mass__solvent:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The mass of the solvent in ${_fix(suffix)} is ${value}g`
            : `What is the mass of the solvent in ${_fix(suffix)}?`,
      vapor__density:
        (suffix = "substance") =>
        (value) =>
          value
            ? `The vapor density of ${_fix(suffix)} is ${value}g`
            : `What is the vapor density of ${_fix(suffix)}?`,
    },
  ),
  {
    temp_celsius: (value) =>
      value
        ? `The temperature of a substance is ${value}°C`
        : "What is the temperature of the substance in degrees Celsius?",
    temp_kelvin: (value) =>
      value
        ? `The temperature of a substance is ${value} K`
        : "What is the temperature of the substance in Kelvin?",
    temp_fahrenheit: (value) =>
      value
        ? `The temperature of a substance is ${value}°F`
        : "What is the temperature of the substance in degrees Fahrenheit?",

    mole_molecules_solute: (value) =>
      value
        ? `The amount of solute in a solution is ${value}mol`
        : "How many moles of solute are in the solution?",
    mole_molecules_solvent: (value) =>
      value
        ? `The amount of solvent in a solution is ${value}mol`
        : "How many moles of solvent are in the solution?",

    Xa: (value) => (value ? `$X_a$ is ${value}` : "Find $X_a$"),
    Xb: (value) => (value ? `$X_b$ is ${value}` : "Find $X_b$"),

    molality: (value) =>
      value
        ? `The molality of a solution is ${value}M`
        : "What is the molality of the solution?",
    molarity: (value) =>
      value
        ? `The molarity of a solution is ${value}m`
        : "What is the molarity of the solution?",

    ab__weight: (value) =>
      value
        ? `The weight of solution of A and B is ${value}g`
        : "What is the weight of the solution of A and B?",
    solution_weight: (value) =>
      value
        ? `The weight of solution is ${value}g`
        : "What is the weight of the solution?",
    a_mass_percent: (value) =>
      value
        ? `The mass percentage of A in the solution is ${value}%`
        : "What is the mass percentage of A in the solution?",
    b_mass_percent: (value) =>
      value
        ? `The mass percentage of B in the solution is ${value}%`
        : "What is the mass percentage of B in the solution?",
    solute_mass_percent: (value) =>
      value
        ? `The mass percentage of the solute is ${value}%`
        : "What is the mass percentage of the solute?",
    solvent_mass_percent: (value) =>
      value
        ? `The mass percentage of the solvent is ${value}%`
        : "What is the mass percentage of the solvent?",
  },
);

export const chemCh1ShortNames = Object.assign(
  shortNamesInTermsOf(["a", "b", "solute", "solvent", "ab", "solution"], {
    moles_molecules: "amount of molecules[ of $]",
    volm: "volume[ of $] in liters",
    n_molecules: "no. of molecules[ of $]",
    n_atoms: "no. of atoms[ of $]",
    mole_atoms: "amount of atoms[ of $]",
    atoms_per_molecule: "no. of atoms per molecule[ in $]",
    weight: "weight[ of $]",
    mass_atoms: "mass of one mole atoms[ of $]",
    mass_molecules: "mass of one mole molecules[ of $]",
    mass_one_atom: "mass of one atom[ of $]",
    mass_one_molecule: "mass of one molecule[ of $]",
    mass_solute: "mass of solute[ in $]",
    mass_solvent: "mass of solvent[ in $]",
    vapor_density: "vapor density[ of $]",
  }),
  {
    temp_celsius: "temp. in celsius",
    temp_kelvin: "temp. in kelvin",
    temp_fahrenheit: "temp. in fahrenheit",
    mole_molecules_solute: "no. of moles of solute",
    mole_molecules_solvent: "no. of moles of solvent",
    Xa: "X_a",
    Xb: "X_b",
    molality: "molality of solution",
    molarity: "molarity of solution",
    ab__weight: "weight of solution of A and B",
    solution_weight: "weight of solution",
    a_mass_percent: "mass percentage of A",
    b_mass_percent: "mass percentage of B",
    solute_mass_percent: "mass percentage of solute",
    solvent_mass_percent: "mass percentage of solvent",
  },
);
