import { Engine, Task } from "grimoire-kolmafia";
import { abort } from "kolmafia";

import { args } from "./args";

export class bLoopEngine extends Engine<never, Task> {
  execute(task: Task): void {
    if (task.name === args.global.abortBefore) {
      abort(`Aborting before executing specified task '${task.name}'.`);
    }

    super.execute(task);
  }
}
