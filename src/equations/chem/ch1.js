import { eq, eqsInTermsOf, namesInTermsOf } from "../../util";

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
    "[]_moles_molecules = []_volm / 22.4",
    "[]_n_molecules = []_moles_molecules * Na",
    "[]_n_atoms = []_mole_atoms * Na",
    "[]_atoms_per_molecule = []_n_atoms / []_n_molecules",
    "[]_mole_atoms = []_weight / []_mass_atoms",
    "[]_moles_molecules = []_weight / []_mass_molecules",
    "[]_mass_one_atom = []_mass_atoms / Na",
    "[]_mass_one_molecule = []_mass_molecules / Na",
    "[]_mass_molecules = 2 * []_vapor_density",
  ),

  "ab_weight = a_weight + b_weight",
  "a_mass_percent = a_weight * 100 / ab_weight",
  "b_mass_percent = b_weight * 100 / ab_weight",

  "solution_weight = solvent_weight + solute_weight",
  "solute_mass_percent = solute_weight * 100 / solution_weight",
  "solvent_mass_percent = solvent_weight * 100 / solution_weight",
].map(eq);

export const chemCh1Names = Object.assign(
  namesInTermsOf(["a", "b", "solute", "solvent", "ab", "solution"], {
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

    molality: "molality",
    molarity: "molarity",

    ab_weight: "weight of solution of A and B",
    solution_weight: "weight of solution",
    a_mass_percent: "mass percentage of A",
    b_mass_percent: "mass percentage of B",
    solute_mass_percent: "mass percentage of solute",
    solvent_mass_percent: "mass percentage of solvent",
  },
);
