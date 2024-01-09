import { Args } from "grimoire-kolmafia";
import { userPrompt } from "kolmafia";
import { set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export { ascensionScript as pref, ascensionScriptPref as arg, setAscensionScript as init };

const ascensionScript: preference = {
  setting: "tptb.bLooper.ascensionScript",
  help: "The command you'd normally use to run your ascension script (e.g., 'instansccs')",
};

const ascensionScriptPref = Args.string({
  setting: ascensionScript.setting,
  help: ascensionScript.help,
});

function setAscensionScript(): void {
  const pref = userPrompt(ascensionScript.help);
  set(ascensionScript.setting, pref);
  args.leg2.ascensionScript = pref;
}
