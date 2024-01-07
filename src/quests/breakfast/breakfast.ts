import { Quest, Task } from "grimoire-kolmafia";
import { get } from "libram";

import { DAILY_TASKS } from "./tasks/daily";

export const breakfast: Quest<Task> = {
  name: "Breakfast",
  ready: () => get("ascensionsToday") === 0,
  tasks: [...DAILY_TASKS],
};
