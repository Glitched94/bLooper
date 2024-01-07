import { $item, set } from "libram";
import { allAstralDeliAliases, stringToAstralDeliItem } from "../../aliases/astralDeli";
import { Item, userPrompt } from "kolmafia";
import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";
import { args } from "../../args";

export {
    astralDeli as pref,
    astralDeliPref as arg,
    setAstralDeli as init
}

const astralDeli: preference = {
    setting: "tptb.bLooper.astralDeli",
    help: "The name of the item you'd like to buy from the Astral Deli in the afterlife.",
}

const astralDeliPref = Args.custom<Item>({
    setting: astralDeli.setting,
    help: astralDeli.help,
    default: $item.none,
    hidden: true,
    options: [
        ...allAstralDeliAliases.map(
            ({ item, aliases }) => [
                item,
                `${aliases
                    .filter((alias) => alias !== "")
                    .join(", ")}`,
            ] as [Item, string],
        ),
        [$item.none, "leave this field blank"]
    ],
},
stringToAstralDeliItem,
"Item");

function setAstralDeli(): void {
    var pref = userPrompt(astralDeli.help + " Use 'blooper help showAll' to see all acceptable values for this setting.");
    set(astralDeli.setting, pref);
    args.afterlife.astralDeli = stringToAstralDeliItem(pref);
}