import { Quest, Task } from "grimoire-kolmafia";
import { get } from "libram";

import { ASCEND } from "./tasks/ascend";
import { PRE_ASCEND } from "./tasks/ascendPrep";
import { GARBO } from "./tasks/garbo";
import { OVERDRUNK } from "./tasks/overdrunk";
import { JOIN_CLAN } from "./tasks/whitelist";

export const leg1: Quest<Task>[] = [
  {
    name: "Loop Start",
    tasks: [JOIN_CLAN],
  },
  {
    name: "Leg 1 Garbo",
    ready: () => get("ascensionsToday") === 0,
    tasks: [...GARBO],
  },
  {
    name: "Ascenscion Prep",
    ready: () => get("ascensionsToday") === 0,
    tasks: [...PRE_ASCEND],
  },
  ...OVERDRUNK,
  ASCEND,
];
