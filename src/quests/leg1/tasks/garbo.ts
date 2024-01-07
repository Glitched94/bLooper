import { Task } from "grimoire-kolmafia";
import {
  cliExecute,
  inebrietyLimit,
  itemAmount,
  mallPrice,
  myAdventures,
  myInebriety,
  print,
  use,
} from "kolmafia";
import { $item, get } from "libram";
import { set } from "libram/dist/property";

import { args } from "../../../lib/args";
import { buildGarboCommand } from "../../../lib/garboBuilder";

export const GARBO: Task[] = [
  {
    name: "Essential Tofu",
    ready: () => mallPrice($item`Essential Tofu`) < 4 * get("valueOfAdventure"),
    completed: () => get("_essentialTofuUsed"),
    acquire: [
      {
        item: $item`Essential Tofu`,
        price: get("valueOfAdventure") * 4,
      },
    ],
    do: () => use(1, $item`Essential Tofu`),
  },
  {
    name: "Golden Dice",
    ready: () => itemAmount($item`Glenn's Golden Dice`) > 0,
    completed: () => get("_glennGoldenDiceUsed"),
    do: () => use(1, $item`Glenn's Golden Dice`),
  },
  {
    name: "Lodestone",
    ready: () => itemAmount($item`lodestone`) > 0,
    completed: () => get("_lodestoneUsed"),
    do: () => use(1, $item`lodestone`),
  },
  {
    name: "Leg1 valueOfAdventure",
    completed: () => get("valueOfAdventure") === args.leg1.leg1ValueOfAdventure,
    do: () => {
      set("valueOfAdventure", args.leg1.leg1ValueOfAdventure);
    },
  },
  {
    name: "Garbo",
    ready: () => get("ascensionsToday") === 0 && myInebriety() <= inebrietyLimit(),
    completed: () => myAdventures() === 0,
    do: () => {
      const command = buildGarboCommand(true);

      print(`Running garbo with command '${command}'`, "teal");
      const success = cliExecute(`garbo ${command}`);
      if (!success) throw `Failed to execute garbo with command '${command}'`;
    },
    limit: {
      tries: 1,
    },
  },
];
