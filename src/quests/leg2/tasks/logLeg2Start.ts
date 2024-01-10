import { Task } from "grimoire-kolmafia";

import { args } from "../../../lib/args";
import { LEG2START } from "../../../lib/constants";
import { logEvent } from "../../../lib/eventLogging";

export const LOG_START: Task = {
  name: "Log Leg2 Start",
  completed: () => args.global.eventList.includes(LEG2START),
  do: () => logEvent(LEG2START),
};
