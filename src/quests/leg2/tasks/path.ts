import { Task } from "grimoire-kolmafia";
import { get } from "libram";

import { executeAscensionScript } from "../../../lib/libraryExecutors/ascensionScript";

export const PATH: Task = {
  name: "Run Ascencion Script",
  completed: () => get("kingLiberated") || get("csServicesPerformed").split(",").length === 11,
  do: executeAscensionScript,
  limit: {
    tries: 1,
  },
};
