import { Args } from "grimoire-kolmafia";
import { userPrompt } from "kolmafia";
import { set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export { homeClan as pref, homeClanPref as arg, setHomeClan as init };

const homeClan: preference = {
  setting: "tptb.bLooper.homeClan",
  help: "Your home clan. The script will ensure you are in this clan at the start of each leg of the loop.",
};

const homeClanPref = Args.string({
  setting: homeClan.setting,
  help: homeClan.help,
  default: "",
});

function setHomeClan(): void {
  const homeClanPref = userPrompt(homeClan.help);
  set(homeClan.setting, homeClanPref);
  args.global.homeClan = homeClanPref;
}
