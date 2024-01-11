import { Task } from "grimoire-kolmafia";

import { START } from "../../../lib/constants";
import { checkLogForEvent, logEvent } from "../../../lib/eventLogging";

export const LOG_START: Task = {
  name: "Log Start",
  completed: () => checkLogForEvent(START),
  do: () => logEvent(START),
};
