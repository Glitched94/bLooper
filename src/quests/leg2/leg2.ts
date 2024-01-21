import { Quest, Task } from "grimoire-kolmafia";
import { get } from "libram";

import { EXTENDED_BREAKFAST } from "../breakfast";
import { STILLSUIT } from "../stillsuit";

import { FILL_MAID } from "./tasks/campgroundMaid";
import { GARBO } from "./tasks/garbo";
import { JAMMIES } from "./tasks/jammies";
import { LOG_END } from "./tasks/logLeg2End";
import { LOG_START } from "./tasks/logLeg2Start";
import { NIGHTCAP } from "./tasks/nightcap";
import { PATH } from "./tasks/path";
import { OPEN_RAINDOH } from "./tasks/raindoh";
import { REFUEL_ASDON } from "./tasks/refuelAsdon";
import { SHRUG_AT } from "./tasks/shrugAT";

export const LEG_2: Quest<Task> = {
  name: "Leg 2",
  ready: () => get("ascensionsToday") === 1,
  tasks: [
    LOG_START,
    PATH,
    SHRUG_AT,
    ...EXTENDED_BREAKFAST,
    REFUEL_ASDON,
    OPEN_RAINDOH,
    ...GARBO,
    ...FILL_MAID,
    STILLSUIT,
    NIGHTCAP,
    JAMMIES,
    LOG_END,
  ],
};
