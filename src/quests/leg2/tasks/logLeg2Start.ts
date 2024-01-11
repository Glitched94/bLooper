import { Task } from "grimoire-kolmafia";

import { LEG2START } from "../../../lib/constants";
import { checkLogForEvent, logEvent } from "../../../lib/eventLogging";

export const LOG_START: Task = {
  name: "Log Leg2 Start",
  completed: () => checkLogForEvent(LEG2START),
  do: () => logEvent(LEG2START),
};
