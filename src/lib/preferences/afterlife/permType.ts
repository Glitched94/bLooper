import { Args } from "grimoire-kolmafia";
import { userPrompt } from "kolmafia";
import { set } from "libram";

import { args } from "../../args";
import { preference } from "../preference";

export { permType as pref, permTypePref as arg, setPermType as init };

const permType: preference = {
  setting: "tptb.bLooper.permType",
  help: "How should we try and permanancey skills in the afterlife?",
};

const permTypePref = Args.string({
  setting: permType.setting,
  help: permType.help,
  default: "sc",
  options: [
    ["sc", "Softcore"],
    ["hc", "Hardcore"],
  ],
});

function setPermType(): void {
  const pref = userPrompt(
    `${permType.help} Use 'blooper help options' to see all acceptable values for this setting.`,
  );
  set(permType.setting, pref);
  args.afterlife.permType = pref;
}
