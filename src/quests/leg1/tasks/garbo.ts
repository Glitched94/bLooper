import { Task } from "grimoire-kolmafia";
import { inebrietyLimit, mallPrice, myAdventures, myInebriety, use } from "kolmafia";
import { $item, get, have, set } from "libram";

import { args } from "../../../lib/args";
import { executeGarbo } from "../../../lib/libraryExecutors/garbo";
import { logEvent } from "../../../lib/eventLogging";
import { bountiesComplete, executeBountiful } from "../../../lib/libraryExecutors/bountiful";
import { LEG1GARBO, LEG1NOBARF } from "../../../lib/constants";

const tofu = $item`essential tofu`;
const ESSENTIAL_TOFU: Task = {
  name: "Essential Tofu",
  ready: () => mallPrice(tofu) < 4 * get("valueOfAdventure"),
  completed: () => get("_essentialTofuUsed"),
  acquire: [
    {
      item: tofu,
      price: get("valueOfAdventure") * 4,
    },
  ],
  do: () => use(1, tofu),
};

const goldenDice = $item`Glenn's golden dice`;
const GOLDEN_DICE: Task = {
  name: "Golden Dice",
  ready: () => have(goldenDice),
  completed: () => get("_glennGoldenDiceUsed"),
  do: () => use(1, goldenDice),
};

const lodestone = $item`lodestone`;
const LODESTONE: Task = {
  name: "Lodestone",
  ready: () => have(lodestone),
  completed: () => get("_lodestoneUsed"),
  do: () => use(1, lodestone),
};

const VALUE_OF_ADVENTURE: Task = {
  name: "Set valueOfAdventure",
  completed: () => get("valueOfAdventure") === args.leg1.leg1ValueOfAdventure,
  do: () => set("valueOfAdventure", args.leg1.leg1ValueOfAdventure),
};

const RUN_GARBO_NOBARF: Task = {
  name: "Garbo Nobarf",
  ready: () => myInebriety() <= inebrietyLimit() && args.global.getBounties,
  completed: () => args.global.eventList.includes(LEG1NOBARF),
  do: () => {
    executeGarbo(1, true, true);
    logEvent(LEG1NOBARF);
  },
  limit: {
    tries: 1,
  },
};

const BOUNTIFUL: Task = {
  name: "Bountiful",
  ready: () => args.global.getBounties,
  completed: bountiesComplete,
  do: executeBountiful,
};

const LEG1_GARBO: Task = {
  name: "Garbo",
  ready: () => myInebriety() <= inebrietyLimit(),
  completed: () => args.global.eventList.includes(LEG1GARBO),
  do: () => {
    executeGarbo(1, true, false);

    if (myAdventures() === 0) {
      logEvent(LEG1GARBO);
    } else {
      throw `We still had adventures left over after successfully running garbo, that shouldn't happen.`;
    }
  },
  limit: {
    tries: 1,
  },
};

export const GARBO: Task[] = [
  ESSENTIAL_TOFU,
  GOLDEN_DICE,
  LODESTONE,
  VALUE_OF_ADVENTURE,
  RUN_GARBO_NOBARF,
  BOUNTIFUL,
  LEG1_GARBO,
];
