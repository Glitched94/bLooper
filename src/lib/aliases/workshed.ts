import { Item, print } from "kolmafia";
import { $item, $items } from "libram";

import { stripString, toInitials } from "../args";

const workshedAliases = [
  { item: $item`model train set`, aliases: ["trainrealm"] },
  { item: $item`Asdon Martin keyfob`, aliases: ["breadcar", "car", "aston"] },
  { item: $item`Little Geneticist DNA-Splicing Lab`, aliases: ["dnalab"] },
];
const unaliasedSheds = $items`cold medicine cabinet, diabolic pizza cube, portable Mayo Clinic, spinning wheel, warbear auto-anvil, warbear chemistry lab, warbear high-efficiency still, warbear induction oven, warbear jackhammer drill press, warbear LP-ROM burner`;
export const allWorkshedAliases = [
  ...workshedAliases.map(({ item, aliases }) => {
    return { item: item, aliases: [...aliases, item.name.toLowerCase()] };
  }),
  ...unaliasedSheds.map((item) => {
    return { item: item, aliases: [item.name.toLowerCase()] };
  }),
];

export function stringToWorkshedItem(s: string): Item {
  if (s === "") return $item.none;

  const lowerCaseWorkshed = s.toLowerCase();
  const strippedWorkshed = stripString(lowerCaseWorkshed);
  const validWorksheds = allWorkshedAliases.filter(
    ({ item, aliases }) =>
      toInitials(item.name.toLowerCase()) === lowerCaseWorkshed ||
      item.name.toLowerCase().includes(lowerCaseWorkshed) ||
      stripString(item.name.toLowerCase()).includes(strippedWorkshed) ||
      aliases.some((alias) => alias === lowerCaseWorkshed),
  );

  if (validWorksheds.length > 1) {
    print(`Invalid Workshed: ${s} matches multiple worksheds! Matched:`, "red");
    validWorksheds.forEach(({ item }) => print(`${item}`, "red"));
    throw new Error();
  } else if (validWorksheds.length === 0) {
    print(`Invalid Workshed: ${s} does not match any worksheds!`, "red");
    throw new Error();
  }

  return validWorksheds[0].item;
}
