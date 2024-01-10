import { Quest, Task } from "grimoire-kolmafia";
import { get } from "libram";

import { EXTENDED_BREAKFAST } from "../breakfast";

import { ASCEND_PREP } from "./tasks/ascendPrep";
import { GARBO } from "./tasks/garbo";

export const LEG_1: Quest<Task> = {
  name: "Leg 1",
  ready: () => get("ascensionsToday") === 0,
  tasks: [...EXTENDED_BREAKFAST, ...GARBO, ...ASCEND_PREP],
};
