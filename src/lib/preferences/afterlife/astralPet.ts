import { $item, set } from "libram";
import { allAstralPetAliases, stringToAstralPet } from "../../aliases/astralPet";
import { Item, userPrompt } from "kolmafia";
import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";
import { args } from "../../args";

export {
    astralPet as pref,
    astralPetPref as arg,
    setAstralPet as init
}

const astralPet: preference = {
    setting: "tptb.bLooper.astralPet",
    help: ""
};

const astralPetPref = Args.custom<Item>({
    setting: astralPet.setting,
    help: astralPet.help,
    default: $item.none,
    options: [
        ...allAstralPetAliases.map(
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
stringToAstralPet,
"Item");

function setAstralPet(): void {
    var pref = userPrompt(astralPet.help + " Use 'blooper help options' to see all acceptable values for this setting.");
    set(astralPet.setting, pref);
    args.afterlife.astralPet = stringToAstralPet(pref);
}