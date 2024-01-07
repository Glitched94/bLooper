import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";
import { toBoolean, userPrompt } from "kolmafia";
import { set } from "libram";
import { args } from "../../args";

export {
    buyDaypass as pref,
    buyDaypassPref as arg,
    setBuyDaypass as init
}

const buyDaypass: preference = {
    setting: "tptb.bLooper.buyDaypass",
    help: "Set to 'true' if you'd like to attempt purchasing a one-day pass to Spring Break Beach for yachtzeechaining.",
}

const buyDaypassPref = Args.boolean({
    setting: buyDaypass.setting,
    help: buyDaypass.help,
    default: false,
});

function setBuyDaypass(): void {
    var pref = toBoolean(userPrompt(buyDaypass.help));
    set(buyDaypass.setting, pref);
    args.leg1.buyDaypass = pref;
}