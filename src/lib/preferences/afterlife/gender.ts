import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";
import { userPrompt } from "kolmafia";
import { set } from "libram";
import { args } from "../../args";

export {
    gender as pref,
    genderPref as arg,
    setGender as init
}

const gender: preference = {
    setting: "tptb.bLooper.gender",
    help: ""
};

const genderPref = Args.number({
    setting: gender.setting,
    help: gender.help,
    default: 1,
    options: [
        [1, "Male"],
        [2, "Female"]
    ]
});

function setGender(): void {
    var pref = Number.parseInt(userPrompt(gender.help + " Use 'blooper help options' to see all acceptable values for this setting."));
    set(gender.setting, pref);
    args.afterlife.gender = pref;
}