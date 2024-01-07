import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";
import { args } from "../../args";
import { set } from "libram";
import { userPrompt } from "kolmafia";

export {
    lifestyle as pref,
    lifestylePref as arg,
    setLifestyle as init
}

const lifestyle: preference = {
    setting: "tptb.bLooper.lifestyle",
    help: "The type of ascension you want to run."
};

const lifestylePref = Args.number({
    setting: lifestyle.setting,
    help: lifestyle.help,
    default: 2,
    options: [
        [1, "Casual"],
        [2, "Normal (or Softcore)"],
        [3, "Hardcore"]
    ]
});

function setLifestyle(): void {
    var pref = Number.parseInt(userPrompt(lifestyle.help + " Use 'blooper help options' to see all acceptable values for this setting."));
    set(lifestyle.setting, pref);
    args.afterlife.lifestyle = pref;
}