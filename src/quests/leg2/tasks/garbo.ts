import { Task } from "grimoire-kolmafia";
import { inebrietyLimit, myAdventures, myInebriety } from "kolmafia";
import { get, set } from "libram";

import { args } from "../../../lib/args";
import { LEG2GARBO, LEG2NOBARF } from "../../../lib/constants";
import { logEvent } from "../../../lib/eventLogging";
import { bountiesComplete, executeBountiful } from "../../../lib/libraryExecutors/bountiful";
import { executeGarbo } from "../../../lib/libraryExecutors/garbo";

const VALUE_OF_ADVENTURE: Task = {
  name: "Set valueOfAdventure",
  completed: () => get("valueOfAdventure") === args.leg2.leg2ValueOfAdventure,
  do: () => set("valueOfAdventure", args.leg2.leg2ValueOfAdventure),
};

const RUN_GARBO_NOBARF: Task = {
  name: "Garbo Nobarf",
  ready: () => myInebriety() <= inebrietyLimit() && args.global.getBounties,
  completed: () => args.global.eventList.includes(LEG2NOBARF),
  do: () => {
    executeGarbo(2, false, true);
    logEvent(LEG2NOBARF);
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

const LEG2_GARBO: Task = {
  name: "Garbo",
  ready: () => myInebriety() <= inebrietyLimit(),
  completed: () => args.global.eventList.includes(LEG2GARBO),
  do: () => {
    executeGarbo(2, false, false);

    if (myAdventures() === 0) {
      logEvent(LEG2GARBO);
    } else {
      throw `We still had adventures left over after successfully running garbo, that shouldn't happen.`;
    }
  },
  limit: {
    tries: 1,
  },
};

export const GARBO: Task[] = [VALUE_OF_ADVENTURE, RUN_GARBO_NOBARF, BOUNTIFUL, LEG2_GARBO];
