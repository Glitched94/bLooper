import { Quest, Task } from "grimoire-kolmafia";
import {
  cliExecute,
  hippyStoneBroken,
  inebrietyLimit,
  myAdventures,
  myInebriety,
  pvpAttacksLeft,
  use,
  visitUrl,
} from "kolmafia";
import { $item, get, have, set } from "libram";

import { args } from "../../lib/args";
import { comboReady, executeCombo } from "../../lib/libraryExecutors/combo";
import { executeGarbo } from "../../lib/libraryExecutors/garbo";

const OVERDRINK: Task = {
  name: "Get Drunk",
  completed: () => myInebriety() > inebrietyLimit(),
  do: () => cliExecute(`CONSUME ALL NIGHTCAP VALUE ${get("valueOfAdventure") / 2}`),
};

const BREAK_HIPPY_STONE: Task = {
  name: "Break Hippy Stone",
  completed: () => hippyStoneBroken(),
  do: () => visitUrl("peevpee.php?action=smashstone&pwd&confirm=on", true),
};

const diploma = $item`School of Hard Knocks Diploma`;
const GO_TO_SCHOOL: Task = {
  name: "Go to School",
  ready: () => have(diploma),
  completed: () => get("_hardKnocksDiplomaUsed"),
  do: () => use(diploma),
};

const mirror = $item`punching mirror`;
const PUNCH_MIRRORS: Task = {
  name: "Punch Mirrors",
  ready: () => have(mirror),
  completed: () => get("_punchingMirrorUsed"),
  do: () => use(mirror),
};

const fireStarter = $item`CSA fire-starting kit`;
const BURN_STUFF: Task = {
  name: "Burn Stuff",
  ready: () => have(fireStarter),
  completed: () => get("_fireStartingKitUsed"),
  choices: {
    595: 1,
  },
  do: () => use(fireStarter),
};

const PVP_PREP: Task[] = [BREAK_HIPPY_STONE, GO_TO_SCHOOL, PUNCH_MIRRORS, BURN_STUFF];

const FIGHT_STUFF: Task = {
  name: "Fight Stuff",
  ready: hippyStoneBroken,
  completed: () => pvpAttacksLeft() === 0,
  do: () => {
    const success = cliExecute("PVP_MAB");
    if (!success) throw `Failed to run PVP_MAB for some reason, please check what went wrong.`;
  },
  limit: {
    tries: 1,
  },
};

const FIGHT_STUFF_2: Task = {
  name: "Fight Stuff Again",
  ready: hippyStoneBroken,
  completed: () => pvpAttacksLeft() === 0,
  do: () => {
    const success = cliExecute("PVP_MAB");
    if (!success) throw `Failed to run PVP_MAB for some reason, please check what went wrong.`;
  },
  limit: {
    tries: 1,
  },
};

const WINEGLASS_VALUEOFADVENTURE: Task = {
  name: "Set valueOfAdventure",
  completed: () => get("valueOfAdventure") === args.leg1.wineglassValueOfAdventure,
  do: () => set("valueOfAdventure", args.leg1.wineglassValueOfAdventure),
};

const OVERDRUNK_GARBO: Task = {
  name: "Overdrunk Garbo",
  ready: () => myInebriety() > inebrietyLimit(),
  completed: () => myAdventures() === 0,
  do: () => executeGarbo(1, true, false),
  limit: {
    tries: 1,
  },
};

const USE_COMBO: Task = {
  name: "Comb the Beach",
  ready: comboReady,
  completed: () => myAdventures() === 0,
  do: executeCombo,
};

const WITH_WINEGLASS: Quest<Task> = {
  name: "Overdrunk with Wineglass",
  ready: () => have($item`Drunkula's wineglass`),
  tasks: [
    OVERDRINK,
    ...PVP_PREP,
    FIGHT_STUFF,
    WINEGLASS_VALUEOFADVENTURE,
    OVERDRUNK_GARBO,
    FIGHT_STUFF_2,
  ],
};

const WITHOUT_WINEGLASS: Quest<Task> = {
  name: "Overdrunk without Wineglass",
  ready: () => !have($item`Drunkula's wineglass`),
  tasks: [OVERDRINK, USE_COMBO, ...PVP_PREP, FIGHT_STUFF],
};

export const LEG_1_OVERDRUNK: Quest<Task>[] = [WITH_WINEGLASS, WITHOUT_WINEGLASS];
