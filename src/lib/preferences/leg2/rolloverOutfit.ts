import { Args } from "grimoire-kolmafia";
import { userPrompt } from "kolmafia";
import { set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export { rolloverOutfit as pref, rolloverOutfitPref as arg, setRolloverOutfit as init };

const rolloverOutfit: preference = {
  setting: "tptb.bLooper.rolloverOutfit",
  help: "The name of the outfit you'd like to equip for rollover.",
};

const rolloverOutfitPref = Args.string({
  setting: rolloverOutfit.setting,
  help: rolloverOutfit.help,
  default: "",
});

function setRolloverOutfit(): void {
  const pref = userPrompt(rolloverOutfit.help);
  set(rolloverOutfit.setting, pref);
  args.leg2.rolloverOutfit = pref;
}
