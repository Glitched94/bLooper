import { Task } from "grimoire-kolmafia";

import { args } from "../../../lib/args";
import { START } from "../../../lib/constants";
import { logEvent } from "../../../lib/eventLogging";

export const LOG_START: Task = {
  name: "Log Start",
  completed: () => args.global.eventList.includes(START),
  do: () => logEvent(START),
};
