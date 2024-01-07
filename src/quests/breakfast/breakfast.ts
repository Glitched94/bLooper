import { Quest, Task } from "grimoire-kolmafia";

import { DAILY_TASKS } from "./tasks/daily";

export const breakfast: Quest<Task> = {
  name: "Breakfast",
  tasks: [...DAILY_TASKS],
};
