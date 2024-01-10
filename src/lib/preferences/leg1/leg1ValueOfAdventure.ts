import { Args } from "grimoire-kolmafia";
import { userPrompt } from "kolmafia";
import { get, set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export {
  leg1ValueOfAdventure as pref,
  leg1ValueOfAdventurePref as arg,
  setLeg1ValueOfAdventure as init,
};

const leg1ValueOfAdventure: preference = {
  setting: "tptb.bLooper.leg1ValueOfAdventure",
  help: "The 'valueOfAdventure' to set before running Garbo in Leg 1 of your daily loop.",
};

const leg1ValueOfAdventurePref = Args.number({
  setting: leg1ValueOfAdventure.setting,
  help: leg1ValueOfAdventure.help,
  default: get("valueOfAdventure"),
});

function setLeg1ValueOfAdventure(): void {
  const pref = Number.parseInt(userPrompt(leg1ValueOfAdventure.help));
  set(leg1ValueOfAdventure.setting, pref);
  args.leg1.leg1ValueOfAdventure = pref;
}
