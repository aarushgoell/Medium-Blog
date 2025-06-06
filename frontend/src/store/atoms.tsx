import { atom } from "recoil";

export const toggleAtom = atom({
  key: "toggle",
  default: false,
});

export const userAtom = atom({
  key: "userAtom",
  default: "A",
});
