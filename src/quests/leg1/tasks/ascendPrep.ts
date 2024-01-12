import { Task } from "grimoire-kolmafia";
import {
  cliExecute,
  fullnessLimit,
  inebrietyLimit,
  myFullness,
  myGardenType,
  myInebriety,
  mySpleenUse,
  spleenLimit,
  use,
} from "kolmafia";
import { $item, have } from "libram";

import { stringToGardenItem } from "../../../lib/aliases/garden";
import { args } from "../../../lib/args";
import { STILLSUIT } from "../../stillsuit";

const PLANT_GARDEN: Task = {
  name: "Plant Garden",
  ready: () => args.leg1.preAscendGarden !== $item.none && have(args.leg1.preAscendGarden),
  completed: () => stringToGardenItem(myGardenType()) === args.leg1.preAscendGarden,
  do: () => {
    cliExecute("garden pick");
    use(1, args.leg1.preAscendGarden);
  },
};

const CONSUME: Task = {
  name: "CONSUME",
  completed: () =>
    myFullness() >= fullnessLimit() &&
    myInebriety() >= inebrietyLimit() &&
    mySpleenUse() >= spleenLimit(),
  do: () => cliExecute("CONSUME ALL"),
};

export const ASCEND_PREP: Task[] = [PLANT_GARDEN, STILLSUIT, CONSUME];
