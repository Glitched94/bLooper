import { Args } from "grimoire-kolmafia";
import { userPrompt } from "kolmafia";
import { get, set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export {
  wineglassValueOfAdventure as pref,
  wineglassValueOfAdventurePref as arg,
  setWineglassValueOfAdventure as init,
};

const wineglassValueOfAdventure: preference = {
  setting: "tptb.bLooper.wineglassValueOfAdventure",
  help: "The 'valueOfAdventure' to set before running garbo in Leg1 while overdrunk with a wineglass.",
};

const wineglassValueOfAdventurePref = Args.number({
  setting: wineglassValueOfAdventure.setting,
  help: wineglassValueOfAdventure.help,
  default: get("valueOfAdventure"),
});

function setWineglassValueOfAdventure(): void {
  var pref = Number.parseInt(userPrompt(wineglassValueOfAdventure.help));
  set(wineglassValueOfAdventure.setting, pref);
  args.leg1.wineglassValueOfAdventure = pref;
}
