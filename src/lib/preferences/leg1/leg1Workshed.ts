import { Args } from "grimoire-kolmafia";
import { Item, userPrompt } from "kolmafia";
import { $item, set } from "libram";

import { allWorkshedAliases, stringToWorkshedItem } from "../../aliases/workshed";
import { args, toInitials } from "../../args";
import { preference } from "../preference";

export { leg1Workshed as pref, leg1WorkshedPref as arg, setLeg1Workshed as init };

const leg1Workshed: preference = {
  setting: "tptb.bLooper.leg1Workshed",
  help: "The workshed you'd like the script to install at the start of Leg 1. Leave blank to ignore.",
};

const leg1WorkshedPref = Args.custom<Item>(
  {
    setting: leg1Workshed.setting,
    help: leg1Workshed.help,
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

function setLeg1Workshed(): void {
  const pref = userPrompt(
    `${leg1Workshed.help} Use 'blooper help options' to see all acceptable values for this setting.`,
  );
  set(leg1Workshed.setting, pref);
  args.leg1.leg1Workshed = stringToWorkshedItem(pref);
}
