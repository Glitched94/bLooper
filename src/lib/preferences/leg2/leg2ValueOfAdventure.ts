import { Args } from "grimoire-kolmafia";
import { userPrompt } from "kolmafia";
import { get, set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export {
  leg2ValueOfAdventure as pref,
  leg2ValueOfAdventurePref as arg,
  setLeg2ValueOfAdventure as init,
};

const leg2ValueOfAdventure: preference = {
  setting: "tptb.bLooper.leg2ValueOfAdventure",
  help: "The 'valueOfAdventure' to set before running Garbo in Leg 2 of your daily loop.",
};

const leg2ValueOfAdventurePref = Args.number({
  setting: leg2ValueOfAdventure.setting,
  help: leg2ValueOfAdventure.help,
  default: get("valueOfAdventure"),
});

function setLeg2ValueOfAdventure(): void {
  const pref = Number.parseInt(userPrompt(leg2ValueOfAdventure.help));
  set(leg2ValueOfAdventure.setting, pref);
  args.leg2.leg2ValueOfAdventure = pref;
}
