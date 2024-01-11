import { Engine, Task } from "grimoire-kolmafia";
import { abort } from "kolmafia";

import { args } from "./args";
import { printAllDiff } from "./eventLogging";

export class bLoopEngine extends Engine<never, Task> {
  execute(task: Task): void {
    if (task.name === args.global.abortBefore) {
      printAllDiff();
      abort(`Aborting before executing specified task '${task.name}'.`);
    }

    super.execute(task);
  }
}
