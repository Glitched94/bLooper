import { Args } from "grimoire-kolmafia";
import { userPrompt } from "kolmafia";
import { set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export { lifestyle as pref, lifestylePref as arg, setLifestyle as init };

const lifestyle: preference = {
  setting: "tptb.bLooper.lifestyle",
  help: "The type of ascension you want to run.",
};

const lifestylePref = Args.number({
  setting: lifestyle.setting,
  help: lifestyle.help,
  default: 2,
  options: [
    [1, "Casual"],
    [2, "Normal (or Softcore)"],
    [3, "Hardcore"],
  ],
});

function setLifestyle(): void {
  const pref = Number.parseInt(
    userPrompt(
      `${lifestyle.help} Use 'blooper help options' to see all acceptable values for this setting.`,
    ),
  );
  set(lifestyle.setting, pref);
  args.afterlife.lifestyle = pref;
}
