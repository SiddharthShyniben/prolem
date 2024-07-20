export const conditions = {
  Xa: (given) => (given.includes("Xb") ? given.length === 1 : true),
};
