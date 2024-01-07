import { Item, print } from "kolmafia";
import { $item } from "libram";

import { stripString, toInitials } from "../args";

const astralDeliAliases = [
  { item: $item`astral hot dog dinner`, aliases: ["hot dog"] },
  { item: $item`astral six-pack`, aliases: ["six-pack", "pilsner"] },
  { item: $item`carton of astral energy drinks`, aliases: ["energy drinks"] },
];
export const allAstralDeliAliases = [
  ...astralDeliAliases.map(({ item, aliases }) => {
    return { item: item, aliases: [...aliases, item.name.toLowerCase()] };
  }),
];

export function stringToAstralDeliItem(s: string): Item {
  if (s === "") return $item.none;

  const lowercaseName = s.toLowerCase();
  const strippedName = stripString(lowercaseName);
  const validItems = allAstralDeliAliases.filter(
    ({ item, aliases }) =>
      toInitials(item.name.toLowerCase()) === lowercaseName ||
      item.name.toLowerCase().includes(lowercaseName) ||
      stripString(item.name.toLowerCase()).includes(strippedName) ||
      aliases.some((alias) => alias === lowercaseName),
  );

  if (validItems.length > 1) {
    print(`Invalid Astral Deli Item: ${s} matches multiple worksheds! Matched:`, "red");
    validItems.forEach(({ item }) => print(`${item}`, "red"));
    throw new Error();
  } else if (validItems.length === 0) {
    print(`Invalid Astral Deli Item: ${s} does not match any astral deli items!`, "red");
    throw new Error();
  }

  return validItems[0].item;
}
