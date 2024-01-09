import { Quest, Task } from "grimoire-kolmafia";
import {
  buy,
  cliExecute,
  hippyStoneBroken,
  inebrietyLimit,
  mallPrice,
  myAdventures,
  myInebriety,
  pvpAttacksLeft,
  use,
  visitUrl,
} from "kolmafia";
import { $item, get, have } from "libram";
import { set } from "libram/dist/counter";
import { getBoolean } from "libram/dist/property";

import { args } from "../../../lib/args";
import { executeGarbo } from "../../../lib/garboBuilder";

const overdrink: Task = {
  name: "Get drunk",
  completed: () => myInebriety() > inebrietyLimit(),
  do: () => cliExecute(`CONSUME ALL NIGHTCAP VALUE ${get("valueOfAdventure") / 2}`),
};

const breakHippyStone: Task = {
  name: "Break Hippy Stone",
  completed: () => hippyStoneBroken(),
  do: () => visitUrl("peevpee.php?action=smashstone&pwd&confirm=on", true),
};

const goToSchool: Task = {
  name: "Go to School",
  ready: () => have($item`School of Hard Knocks Diploma`),
  completed: () => get("_hardKnocksDiplomaUsed"),
  do: () => use(1, $item`School of Hard Knocks Diploma`),
};

const punchMirrors: Task = {
  name: "Punch mirrors",
  ready: () => have($item`punching mirror`),
  completed: () => getBoolean("_punchingMirrorUsed"),
  do: () => use(1, $item`punching mirror`),
};

const burnStuff: Task = {
  name: "Burn stuff",
  ready: () => have($item`CSA fire-starting kit`),
  completed: () => get("_fireStartingKitUsed"),
  choices: {
    595: 1,
  },
  do: () => use(1, $item`CSA fire-starting kit`),
};

const pvpPrep: Task[] = [breakHippyStone, goToSchool, punchMirrors, burnStuff];

const fightStuff: Task = {
  name: "Fight stuff",
  ready: () => hippyStoneBroken(),
  completed: () => pvpAttacksLeft() === 0,
  do: () => cliExecute("PVP_MAB"),
};

const overdrunkGarbo: Task[] = [
  {
    name: "Wineglass valueOfAdventure",
    completed: () => get("valueOfAdventure") === args.leg1.wineglassValueOfAdventure,
    do: () => {
      set("valueOfAdventure", args.leg1.wineglassValueOfAdventure);
    },
  },
  {
    name: "Overdrunk Garbo",
    ready: () => myInebriety() > inebrietyLimit() && myAdventures() > 0,
    completed: () => myAdventures() === 0,
    do: () => {
      executeGarbo(true);
    },
  },
];

const useCombo: Task = {
  name: "Comb the Beach",
  ready: () => comboReady(),
  completed: () => myAdventures() === 0,
  do: () => cliExecute(`combo ${myAdventures()}`),
};

export const OVERDRUNK: Quest<Task>[] = [
  {
    name: "Overdrunk with Wineglass",
    ready: () => get("ascensionsToday") === 0 && have($item`Drunkula's wineglass`),
    tasks: [overdrink, ...pvpPrep, fightStuff, ...overdrunkGarbo, fightStuff],
  },
  {
    name: "Overdrunk without Wineglass",
    ready: () => get("ascensionsToday") === 0 && !have($item`Drunkula's wineglass`),
    tasks: [overdrink, useCombo, ...pvpPrep, fightStuff],
  },
];

function comboReady(): boolean {
  if (have($item`Beach Comb`)) return true;

  if (have($item`driftwood beach comb`)) {
    const sandPrice = mallPrice($item`grain of sand`) * 3;
    const combPrice = mallPrice($item`piece of driftwood`);
    const advLimit = combPrice / sandPrice;

    if (myAdventures() > advLimit) {
      buy(1, $item`piece of driftwood`);
      use(1, $item`piece of driftwood`);
    }
  }

  return have($item`driftwood beach comb`);
}
