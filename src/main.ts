import { Args, Engine, getTasks } from "grimoire-kolmafia";

import { args } from "./lib/args";

import { breakfast } from "./quests/breakfast/breakfast";
import { leg1 } from "./quests/leg1/leg1";
import * as constants from "./lib/constants";

export default function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    if (args.options) {
      Args.showHelp(args);
    } else {
      Args.showHelp(args, 0);
    }

    return;
  }

  if (args.init) {
    initialize();
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

function initialize(): void {
  // Global
  constants.homeClan.init();

  // Leg 1
  constants.buyDaypass.init();
  constants.leg1Workshed.init();
  constants.preAscendGarden.init();

  // Afterlife
  constants.permType.init();
  constants.path.init();
  constants.lifestyle.init();
  constants.moonSign.init();
  constants.ascendClass.init();
  constants.astralPet.init();
  constants.astralDeli.init();
  constants.gender.init();
}