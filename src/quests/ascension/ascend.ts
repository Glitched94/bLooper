import { Quest, Task } from "grimoire-kolmafia";
import { $path, get } from "libram";

import { args } from "../../lib/args";

import { CS_ASCEND_TASKS } from "./tasks/communityService";

const ASCEND_CS: Quest<Task> = {
  name: "Community Service",
  ready: () => args.afterlife.path === $path`Community Service`,
  completed: () => get("ascensionsToday") === 1,
  tasks: [...CS_ASCEND_TASKS],
};

export const ASCENSION: Quest<Task>[] = [ASCEND_CS];
