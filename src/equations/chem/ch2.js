import { eq, eqsInTermsOf, namesInTermsOf } from "../../util";

export const chemCh2Equations = [
  ...eqsInTermsOf(
    ["a", "b", "solute", "solvent"],
    "[]_mass_one_atom = []_mass_number * 1.66054e24",
    "[]_mass_number = []_number_protons + []_number_neutrons",
    "[]_atomic_number = []_number_protons",
    "[]_atomic_number = []_number_electrons",
  ),

  ...eqsInTermsOf(
    ["a", "b"],
    "[]_energy = planck_constant * []_frequency",
    "[]_frequency = speed_of_light / []_wavelength",
    "[]_wavelength = []_wave_velocity / []_frequency",
    "[]_time_period = 1 / []_frequency",
    "[]_wave_number = 1 / []_wavelength",
  ),

  "wave_number_hydrogen = 109677 * ((1 / p_number__ **2) - (1 / q_number__ ** 2))",

  "transition_spectrum = (q_energy - p_energy) / planck_constant",
  "q_energy - p_energy = rydberg_constant * ((1 / p_number__ ** 2) - (1 / q_number__ ** 2))",

  ...eqsInTermsOf(
    ["p", "q", "one_electron"],
    "ME * []_electron_velocity__ * []_orbit_radius = []_number__ * (planck_constant / (2 * PI))",
    "[]_electron_energy = -rydberg_constant * (1 / []_number__ ** 2)",
    "[]_orbit_radius = []_number__ * 52.9",
    "[]_electron_wavelength = planck_constant / []_electron_mass * []_electron_velocity__",
    "[]_electron_kinetic_energy = ([]_electron_mass * ([]_electron_velocity__ ** 2)) / 2",
    "[]_electron_momentum__ = []_electron_mass * []_electron_velocity__",
    "([]_electron_velocity_uncertainty) * ([]_electron_momentum_uncertainty) = planck_constant / (4 * PI * []_electron_mass)", // TODO: maybe expand
  ),

  ...eqsInTermsOf(
    ["p", "q"],
    "[]_n_number_orbitals = []_number__ ** 2",
    "[]_n_number_electrons = 2 * []_n_number_orbitals",
    "[]_n_total_nodes = []_number__ - 1",
    "[]_n_total_nodes = []_n_angular_nodes + []_n_radial_nodes",
    "[]_n_angular_nodes = []_l",
    "[]_n_radial_nodes = []_number__ - []_l - 1",
    "[]_n_orbital_energy = []_number__ + []_l",
  ),

  "one_electron_ion_energy = -rydberg_constant * ((one_electron_atomic_number ** 2) / (one_electron_number__ ** 2))",
  "one_electron_ion_orbit = 52.9 * (one_electron_number__ ** 2) / one_electron_atomic_number",
].map(eq);

export const chemCh2Names = Object.assign(
  namesInTermsOf(["a", "b", "solute", "solvent"], {
    mass_one_atom: "mass of one atom[ of $]",
    mass_number: "A[_$]",
    atomic_number: "Z[_$]",
    number_protons: "number of protons[ in $]",
    number_neutrons: "number of neutrons[ in $]",
    number_electrons: "number of electrons[ in $]",
  }),
  namesInTermsOf(["a", "b"], {
    energy: "E[_$]",
    frequency: "frequency of wave[ $]",
    wavelength: "\\lambda[_$]",
    time_period: "time period of wave[ $]",
    wave_number: "wave number of wave[ $]",
    wave_velocity: "velocity of wave[ $]",
  }),
  namesInTermsOf(["p", "q"], {
    number__: "n[_$]",
    l: "l[_$]",
    n_number_orbitals: "number of orbitals in shell[ $]",
    n_number_electrons: "number of electrons in shell[ $]",
    n_total_nodes: "total number of nodes[ in $]",
    n_angular_nodes: "number of angular nodes[ in $]",
    n_radial_nodes: "number of radial nodes[ in $] ",
    n_orbital_energy: "energy of orbital[ in $]",
  }),
  namesInTermsOf(["p", "q"], {
    electron_velocity__: "velocity of electron[ $]",
    orbit_radius: "radius of orbit[ of electron $]",
    electron_wavelength: "wavelength of electron[ $]",
    electron_energy: "E[_$]",
    electron_kinetic_energy: "kinetic energy of electron[ $]",
    electron_momentum__: "momentum of electron[ $]",
    electron_mass: "mass of electron[ $]",
    electron_velocity_uncertainty: "uncertainty in velocity of electron[ $]",
    electron_momentum_uncertainty: "uncertainty in momentum of electron[ $]",
  }),
  {
    wave_number_hydrogen: "wave number of hydrogen atom",
    transition_spectrum: "transition spectrum of atom",

    one_electron_number__:
      "principal quantum number of electron in one electron atom",
    one_electron_orbit_radius:
      "radius of orbit of electron in single electron atom",
    one_electron_electron_wavelength:
      "wavelength of electron in single electron atom",
    one_electron_electron_energy: "energy of electron in single electron atom",
    one_electron_electron_kinetic_energy:
      "kinetic energy of electron in single electron atom",
    one_electron_electron_velocity__:
      "velocity of electron in single electron atom",
    one_electron_electron_momentum__:
      "momentum of electron in single electron atom",
    one_electron_electron_mass: "mass of electron in single electron atom",
    one_electron_electron_velocity_uncertainty:
      "uncertainty in velocity of electron in single electron atom",
    one_electron_electron_momentum_uncertainty:
      "uncertainty in momentum of electron in single electron atom",
    one_electron_ion_energy: "energy of atom with only one electron",
    one_electron_ion_orbit: "orbit of electron in single electron atom",
    one_electron_atomic_number: "atomic number of single electron atom",
    speed_of_light: "speed of light",
    rydberg_constant: "rydberg constant",
    p_energy: "energy of electron P",
    q_energy: "energy of electron Q",
  },
);
