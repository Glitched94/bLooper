import { Args, Engine, getTasks } from "grimoire-kolmafia";

import { args } from "./lib/args";
import * as constants from "./lib/constants";
import { breakfast } from "./quests/breakfast/breakfast";
import { leg1 } from "./quests/leg1/leg1";
import { leg2 } from "./quests/leg2/leg2";

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

  const tasks = getTasks([breakfast, ...leg1, ...leg2]);
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
  constants.leg1ValueOfAdventure.init();
  constants.leg1Workshed.init();
  constants.preAscendGarden.init();
  constants.wineglassValueOfAdventure.init();

  // Afterlife
  constants.permType.init();
  constants.path.init();
  constants.lifestyle.init();
  constants.moonSign.init();
  constants.ascendClass.init();
  constants.astralPet.init();
  constants.astralDeli.init();
  constants.gender.init();

  // Leg 2
  constants.ascensionScript.init();
}
