import { Args } from "grimoire-kolmafia";
import { Item, userPrompt } from "kolmafia";
import { $item, set } from "libram";

import { allGardenAliases, stringToGardenItem } from "../../aliases/garden";
import { args, toInitials } from "../../args";
import { preference } from "../preference";

export { preAscendGarden as pref, preAscendGardenPref as arg, setPreAscendGarden as init };

const preAscendGarden: preference = {
  setting: "tptb.bLooper.preAscendGarden",
  help: "The garden you'd like the script to install at the start of Leg 1. Leave blank to ignore.",
};

const preAscendGardenPref = Args.custom<Item>(
  {
    setting: preAscendGarden.setting,
    help: preAscendGarden.help,
    default: $item.none,
    options: [
      ...allGardenAliases.map(
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
  stringToGardenItem,
  "Item",
);

function setPreAscendGarden(): void {
  const pref = userPrompt(
    `${preAscendGarden.help} Use 'blooper help options' to see all acceptable values for this setting.`,
  );
  set(preAscendGarden.setting, pref);
  args.leg1.preAscendGarden = stringToGardenItem(pref);
}
