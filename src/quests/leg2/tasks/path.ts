import { Quest, Task } from "grimoire-kolmafia";
import { cliExecute } from "kolmafia";
import { get } from "libram";

import { args } from "../../../lib/args";

export const PATH: Quest<Task> = {
  name: "Ascension Path",
  ready: () => get("ascensionsToday") === 1,
  tasks: [
    {
      name: "Run Script",
      completed: () => get("kingLiberated") || get("csServicesPerformed").split(",").length === 11,
      do: () => {
        const success = cliExecute(`${args.leg2.ascensionScript}`);
        if (!success)
          throw `Failed to run the specified ascension script '${args.leg2.ascensionScript}' to completion. Please check what went wrong and try again.`;
      },
      limit: {
        tries: 1,
      },
    },
  ],
};
