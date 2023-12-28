import { Args, Engine, getTasks } from "grimoire-kolmafia";

import { args } from "./lib/args";

import { breakfast } from "./quests/breakfast/breakfast";
import { leg1 } from "./quests/leg1/leg1";

export default function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const tasks = getTasks([
    breakfast,
    ...leg1
  ]);
  const engine = new Engine(tasks);

  try {
    engine.run();
  } finally {
    engine.destruct();
  }
}