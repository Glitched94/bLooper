import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";
import { args } from "../../args";
import { set } from "libram";
import { userPrompt } from "kolmafia";

export {
    moonSign as pref,
    moonSignPref as arg,
    setMoonSign as init
}

const moonSign: preference = {
    setting: "tptb.bLooper.moonId",
    help: "The name of the Moon Sign you want to ascend under."
};

const moonSignPref = Args.number({
    setting: moonSign.setting,
    help: moonSign.help,
    default: 8,
    options: [
        [1, "Mongoose"],
        [2, "Wallaby"],
        [3, "Vole"],
        [4, "Platypus"],
        [5, "Opossum"],
        [6, "Marmot"],
        [7, "Wombat"],
        [8, "Blender"],
        [9, "Packrat"]
    ]
});

function setMoonSign(): void {
    var pref = Number.parseInt(userPrompt(moonSign.help + " Use 'blooper help showAll' to see all acceptable values for this setting."));
    set(moonSign.setting, pref);
    args.afterlife.moonSign = pref;
}