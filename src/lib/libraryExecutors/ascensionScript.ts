import { cliExecute } from "kolmafia";

import { args } from "../args";

export function executeAscensionScript(): void {
  const success = cliExecute(`${args.leg2.ascensionScript}`);
  if (!success)
    throw `Failed to run the specified ascension script '${args.leg2.ascensionScript}' to completion. Please check what went wrong and try again.`;
}
