import { Quest, Task } from "grimoire-kolmafia";
import { get } from "libram";

import { EXTENDED_BREAKFAST } from "../breakfast";

import { GARBO } from "./tasks/garbo";
import { LOG_START } from "./tasks/logLeg2Start";
import { PATH } from "./tasks/path";

export const LEG_2: Quest<Task> = {
  name: "Leg 2",
  ready: () => get("ascensionsToday") === 1,
  tasks: [LOG_START, PATH, ...EXTENDED_BREAKFAST, ...GARBO],
};
