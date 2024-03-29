import { Args } from "grimoire-kolmafia";
import { toBoolean, userPrompt } from "kolmafia";
import { set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export { buyDaypass as pref, buyDaypassPref as arg, setBuyDaypass as init };

const buyDaypass: preference = {
  setting: "tptb.bLooper.buyDaypass",
  help: "Set to 'true' if you'd like to attempt purchasing a one-day ticket to Spring Break Beach for yachtzeechaining.",
};

const buyDaypassPref = Args.boolean({
  setting: buyDaypass.setting,
  help: buyDaypass.help,
  default: false,
});

function setBuyDaypass(): void {
  const pref = toBoolean(userPrompt(buyDaypass.help));
  set(buyDaypass.setting, pref);
  args.leg1.buyDaypass = pref;
}
