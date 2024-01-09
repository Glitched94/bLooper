import { Task } from "grimoire-kolmafia";
import {
  cliExecute,
  inebrietyLimit,
  itemAmount,
  mallPrice,
  myAdventures,
  myInebriety,
  use,
} from "kolmafia";
import { $item, get, set } from "libram";

import { logEvent } from "../../../eventLogging";
import { args } from "../../../lib/args";
import { LEG1GARBO, LEG1GARBO_NOBARF } from "../../../lib/constants";
import { executeGarbo } from "../../../lib/garboBuilder";

export const GARBO: Task[] = [
  {
    name: "Essential Tofu",
    ready: () => mallPrice($item`essential tofu`) < 4 * get("valueOfAdventure"),
    completed: () => get("_essentialTofuUsed"),
    acquire: [
      {
        item: $item`essential tofu`,
        price: get("valueOfAdventure") * 4,
      },
    ],
    do: () => use(1, $item`essential tofu`),
  },
  {
    name: "Golden Dice",
    ready: () => itemAmount($item`Glenn's golden dice`) > 0,
    completed: () => get("_glennGoldenDiceUsed"),
    do: () => use(1, $item`Glenn's golden dice`),
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
    name: "Garbo Nobarf",
    ready: () =>
      get("ascensionsToday") === 0 && myInebriety() <= inebrietyLimit() && args.global.getBounties,
    completed: () => args.global.eventList.includes(LEG1GARBO_NOBARF),
    do: () => {
      executeGarbo(false, true);
      logEvent(LEG1GARBO_NOBARF);
    },
    limit: {
      tries: 1,
    },
  },
  {
    name: "Bountiful",
    ready: () => get("ascensionsToday") === 0 && args.global.getBounties,
    completed: () => false,
    do: () => {
      const success = cliExecute("bountiful");
      if (!success) throw `Failed to run 'bountiful'. Please check what went wrong and try again.`;
    },
  },
  {
    name: "Garbo",
    ready: () => get("ascensionsToday") === 0 && myInebriety() <= inebrietyLimit(),
    completed: () => args.global.eventList.includes(LEG1GARBO),
    do: () => {
      executeGarbo(true);

      if (myAdventures() === 0) {
        logEvent(LEG1GARBO);
      }
    },
    limit: {
      tries: 1,
    },
  },
];
