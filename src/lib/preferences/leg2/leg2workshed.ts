import { Args } from "grimoire-kolmafia";
import { Item, userPrompt } from "kolmafia";
import { $item, set } from "libram";

import { allWorkshedAliases, stringToWorkshedItem } from "../../aliases/workshed";
import { args, toInitials } from "../../args";
import { preference } from "../preference";

export { leg2Workshed as pref, leg2WorkshedPref as arg, setLeg2Workshed as init };

const leg2Workshed: preference = {
  setting: "tptb.bLooper.leg2Workshed",
  help: "The workshed you'd like the script to install at the start of Leg 2. Leave blank to ignore.",
};

const leg2WorkshedPref = Args.custom<Item>(
  {
    setting: leg2Workshed.setting,
    help: leg2Workshed.help,
    default: $item.none,
    options: [
      ...allWorkshedAliases.map(
        ({ item, aliases }) =>
          [
            item,
            `${[...aliases, toInitials(item.name.toLowerCase())]
              .filter((alias) => alias !== "")
              .join(", ")}`,
          ] as [Item, string],
      ),
      [$item.none, "leave this field blank"],
    ],
  },
  stringToWorkshedItem,
  "Item",
);

function setLeg2Workshed(): void {
  const pref = userPrompt(
    `${leg2Workshed.help} Use 'blooper help options' to see all acceptable values for this setting.`,
  );
  set(leg2Workshed.setting, pref);
  args.leg2.leg2Workshed = stringToWorkshedItem(pref);
}
