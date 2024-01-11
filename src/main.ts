import { Args, getTasks } from "grimoire-kolmafia";

import { args } from "./lib/args";
import * as constants from "./lib/constants";
import { bLoopEngine } from "./lib/engine";
import { ASCENSION } from "./quests/ascension/ascend";
import { LEG_1 } from "./quests/leg1/leg1";
import { LEG_1_OVERDRUNK } from "./quests/leg1/leg1Overdrunk";
import { LEG_2 } from "./quests/leg2/leg2";
import { printAllDiff } from "./lib/eventLogging";

export default function main(command: string): void {
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

  const tasks = getTasks([LEG_1, ...LEG_1_OVERDRUNK, ...ASCENSION, LEG_2]);
  const engine = new bLoopEngine(tasks);

  try {
    engine.run();
  } finally {
    engine.destruct();
  }

  printAllDiff();
}

function initialize(): void {
  // Global
  constants.homeClan.init();

  // Leg 1
  constants.buyDaypass.init();
  constants.leg1Workshed.init();
  constants.preAscendGarden.init();

  // Afterlife
  constants.astralDeli.init();
  constants.astralPet.init();
  constants.permType.init();

  constants.lifestyle.init();
  constants.ascendClass.init();
  constants.gender.init();
  constants.path.init();
  constants.moonSign.init();

  // Leg 2
  constants.ascensionScript.init();
}
