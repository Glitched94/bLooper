import { Task } from "grimoire-kolmafia";

import { END } from "../../../lib/constants";
import { checkLogForEvent, logEvent } from "../../../lib/eventLogging";

export const LOG_END: Task = {
  name: "Log Leg2 End",
  completed: () => checkLogForEvent(END),
  do: () => logEvent(END),
};
