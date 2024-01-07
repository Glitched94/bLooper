import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";
import { args } from "../../args";
import { set } from "libram";
import { userPrompt } from "kolmafia";

export {
    permType as pref,
    permTypePref as arg,
    setPermType as init
}

const permType: preference = {
    setting: "tptb.bLooper.permType",
    help: "How should we try and permanancey skills in the afterlife?",
}

const permTypePref = Args.string({
    setting: permType.setting,
    help: permType.help,
    default: "sc",
    options: [
        ["sc", "Softcore"],
        ["hc", "Hardcore"]
    ]
});

function setPermType(): void {
    var pref = userPrompt(permType.help + " Use 'blooper help showAll' to see all acceptable values for this setting.");
    set(permType.setting, pref);
    args.afterlife.permType = pref;
}