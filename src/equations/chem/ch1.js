import { eq, eqsInTermsOf, namesInTermsOf } from "../../util";

export const chemCh1Equations = [
  "temp_kelvin = temp_celsius + 273",
  "temp_fahrenheit = (9 * temp_celsius / 5) + 32",

  "Xa = a_moles_molecules / (a_moles_molecules + b_moles_molecules)",
  "Xb = b_moles_molecules / (a_moles_molecules + b_moles_molecules)",

  "molality = solute_moles_molecules / solvent_moles_molecules",
  "molarity = solute_moles_molecules / solvent_volm",

  ...eqsInTermsOf(
    ["a", "b", "solute", "solvent"],
    "{}_moles_molecules = {}_volm / 22.4",
    "{}_n_molecules = {}_moles_molecules * Na",
    "{}_n_atoms = {}_mole_atoms * Na",
    "{}_atoms_per_molecule = {}_n_atoms / {}_n_molecules",
    "{}_mole_atoms = {}_weight / {}_mass_atoms",
    "{}_moles_molecules = {}_weight / {}_mass_molecules",
    "{}_mass_one_atom = {}_mass_atoms / Na",
    "{}_mass_one_molecule = {}_mass_molecules / Na",
    "{}_mass_percent = {}_mass_solute * 100 / {}_mass_solvent",
    "{}_mass_molecules = 2 * {}_vapor_density",
  ),
].map(eq);

export const chemCh1Names = Object.assign(
  {
    temp_celsius: "temp. in celsius",
    temp_kelvin: "temp. in kelvin",
    temp_fahrenheit: "temp. in fahrenheit",

    mole_molecules_solute: "no. of moles of solute",
    mole_molecules_solvent: "no. of moles of solvent",
    Xa: "mole fraction of A",
    Xb: "mole fraction of B",

    molality: "molality",
    molarity: "molarity",

    moles_a: "no. of moles of A",
    moles_b: "no. of moles of B",
    volume_solvent: "volume of solvent",
  },
  namesInTermsOf(["a", "b", "solute", "solvent"], {
    moles_molecules: "amount of molecules{ of $}",
    volm: "volume{ of $} in liters",
    n_molecules: "no. of molecules{ of $}",
    n_atoms: "no. of atoms{ of $}",
    mole_atoms: "amount of atoms{ of $}",
    atoms_per_molecule: "no. of atoms per molecule{ in $}",
    weight: "weight{ of $}",
    mass_atoms: "mass of one mole atoms{ of $}",
    mass_molecules: "mass of one mole molecules{ of $}",
    mass_one_atom: "mass of one atom{ of $}",
    mass_one_molecule: "mass of one molecule{ of $}",
    mass_percent: "mass percent{ of $}",
    mass_solute: "mass of solute{ in $}",
    mass_solvent: "mass of solvent{ in $}",
    vapor_density: "vapor density{ of $}",
  }),
);
