import { Item, print } from "kolmafia";
import { $item } from "libram";

import { stripString, toInitials } from "../args";

const astralPetAliases = [
  { item: $item`astral bludgeon`, aliases: ["bludgeon"] },
  { item: $item`astral shield`, aliases: ["shield"] },
  { item: $item`astral chapeau`, aliases: ["chapeau"] },
  { item: $item`astral bracer`, aliases: ["bracer"] },
  { item: $item`astral longbow`, aliases: ["longbow"] },
  { item: $item`astral shorts`, aliases: ["shorts"] },
  { item: $item`astral mace`, aliases: ["mace"] },
  { item: $item`astral trousers`, aliases: ["trousers"] },
  { item: $item`astral ring`, aliases: ["ring"] },
  { item: $item`astral statuette`, aliases: ["statuette"] },
  { item: $item`astral pistol`, aliases: ["pistol"] },
  { item: $item`astral mask`, aliases: ["mask"] },
  { item: $item`astral pet sweater`, aliases: ["pet sweater", "sweater"] },
  { item: $item`astral shirt`, aliases: ["shirt"] },
  { item: $item`astral belt`, aliases: ["belt"] },
];
export const allAstralPetAliases = [
  ...astralPetAliases.map(({ item, aliases }) => {
    return { item: item, aliases: [...aliases, item.name.toLowerCase()] };
  }),
];

export function stringToAstralPet(s: string): Item {
  if (s === "") return $item.none;

  const lowercaseName = s.toLowerCase();
  const strippedName = stripString(lowercaseName);
  const validItems = allAstralPetAliases.filter(
    ({ item, aliases }) =>
      toInitials(item.name.toLowerCase()) === lowercaseName ||
      item.name.toLowerCase().includes(lowercaseName) ||
      stripString(item.name.toLowerCase()).includes(strippedName) ||
      aliases.some((alias) => alias === lowercaseName),
  );

  if (validItems.length > 1) {
    print(`Invalid Astral Pet: ${s} matches multiple worksheds! Matched:`, "red");
    validItems.forEach(({ item }) => print(`${item}`, "red"));
    throw new Error();
  } else if (validItems.length === 0) {
    print(`Invalid Astral Pet: ${s} does not match any astral pets!`, "red");
    throw new Error();
  }

  return validItems[0].item;
}
