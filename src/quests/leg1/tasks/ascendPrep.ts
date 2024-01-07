import { Task } from "grimoire-kolmafia";
import {
  availableAmount,
  cliExecute,
  fullnessLimit,
  haveEquipped,
  inebrietyLimit,
  itemAmount,
  myFullness,
  myGardenType,
  myInebriety,
  mySpleenUse,
  spleenLimit,
  use,
} from "kolmafia";
import { $familiar, $item, get } from "libram";

import { stringToGardenItem } from "../../../lib/aliases/garden";
import { args } from "../../../lib/args";

export const PRE_ASCEND: Task[] = [
  {
    name: "Plant Garden",
    ready: () =>
      args.leg1.preAscendGarden !== $item.none && itemAmount(args.leg1.preAscendGarden) > 0,
    completed: () => stringToGardenItem(myGardenType()) === args.leg1.preAscendGarden,
    do: () => {
      cliExecute("garden pick");
      use(1, args.leg1.preAscendGarden);
    },
  },
  {
    name: "Stillsuit",
    ready: () => itemAmount($item`tiny stillsuit`) > 0 || haveEquipped($item`tiny stillsuit`),
    outfit: {
      familiar: $familiar`Stooper`,
    },
    completed: () => get("familiarSweat") < 10,
    do: () => cliExecute("drink stillsuit distillate"),
  },
  {
    name: "CONSUME",
    completed: () =>
      myFullness() >= fullnessLimit() &&
      myInebriety() >= inebrietyLimit() &&
      mySpleenUse() >= spleenLimit(),
    do: () => cliExecute("CONSUME ALL"),
  },
  {
    name: "Prepare Pulls",
    acquire: [
      {
        item: $item`calzone of legend`,
        price: 50 * get("valueOfAdventure"),
      },
      {
        item: $item`pizza of legend`,
        price: 50 * get("valueOfAdventure"),
      },
      {
        item: $item`deep dish of legend`,
        price: 50 * get("valueOfAdventure"),
      },
      {
        item: $item`borrowed time`,
      },
      {
        item: $item`non-Euclidean angle`,
      },
      {
        item: $item`tobiko marble soda`,
      },
      {
        item: $item`wasabi marble soda`,
      },
      {
        item: $item`one-day ticket to Dinseylandfill`,
      },
    ],
    completed: () => haveCsPulls(),
    do: () => {},
  },
];

function haveCsPulls(): boolean {
  return (
    availableAmount($item`calzone of legend`) > 0 &&
    availableAmount($item`pizza of legend`) > 0 &&
    availableAmount($item`deep dish of legend`) > 0 &&
    availableAmount($item`borrowed time`) > 0 &&
    availableAmount($item`non-Euclidean angle`) > 0 &&
    availableAmount($item`tobiko marble soda`) > 0 &&
    availableAmount($item`wasabi marble soda`) > 0 &&
    availableAmount($item`one-day ticket to Dinseylandfill`) > 0
  );
}
