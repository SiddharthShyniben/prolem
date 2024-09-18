export const conditions = {
  Xa: (given) => (given.includes("Xb") ? given.length === 1 : true),
  Xb: (given) => (given.includes("Xa") ? given.length === 1 : true),
  ab_weight: (given) =>
    !given.includes("a_weight") || !given.includes("b_weight"),
};
