import { Item, print } from "kolmafia";
import { $item } from "libram";

import { stripString, toInitials } from "../args";

const gardenAliases = [
    { item: $item`packet of pumpkin seeds`, aliases: ["pumpkin"] },
    { item: $item`Peppermint Pip Packet`, aliases: ["peppermint"] },
    { item: $item`packet of dragon's teeth`, aliases: ["skeleton"] },
    { item: $item`packet of beer seeds`, aliases: ["beer"] },
    { item: $item`packet of winter seeds`, aliases: ["winter"] },
    { item: $item`packet of thanksgarden seeds`, aliases: ["thanksgarden"] },
    { item: $item`packet of tall grass seeds`, aliases: ["grass"] },
    { item: $item`packet of mushroom spores`, aliases: ["mushroom"] },
    { item: $item`packet of rock seeds`, aliases: ["rock"] },
];
export const allGardenAliases = [
    ...gardenAliases.map(({ item, aliases }) => {
        return { item: item, aliases: [...aliases, item.name.toLowerCase()] };
    }),
];

export function stringToGardenItem(s: string): Item {
    if (s === "") return $item.none;

    const lowerCaseGarden = s.toLowerCase();
    const strippedGarden = stripString(lowerCaseGarden);
    const validGardens = allGardenAliases.filter(
        ({ item, aliases }) =>
            toInitials(item.name.toLowerCase()) === lowerCaseGarden ||
            item.name.toLowerCase().includes(lowerCaseGarden) ||
            stripString(item.name.toLowerCase()).includes(strippedGarden) ||
            aliases.some((alias) => alias === lowerCaseGarden),
    );

    if (validGardens.length > 1) {
        print(`Invalid Garden: ${s} matches multiple gardens! Matched:`, "red");
        validGardens.forEach(({ item }) => print(`${item}`, "red"));
        throw new Error();
    } else if (validGardens.length === 0) {
        print(`Invalid Garden: ${s} does not match any gardens!`, "red");
        throw new Error();
    }

    return validGardens[0].item;
}