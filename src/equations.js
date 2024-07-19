import { constantsNames } from "./data";
import { chemCh1Equations, chemCh1Names } from "./equations/chem/ch1";
import { chemCh2Equations, chemCh2Names } from "./equations/chem/ch2";

export const equations = [...chemCh1Equations];
export const names = { ...chemCh1Names };
