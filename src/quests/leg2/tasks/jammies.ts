import { Outfit, Task } from "grimoire-kolmafia";
import {
  buy,
  cliExecute,
  create,
  getCustomOutfits,
  getOutfits,
  isWearingOutfit,
  outfitPieces,
} from "kolmafia";
import { $familiar, $item, $slot, have } from "libram";

import { args } from "../../../lib/args";

export const JAMMIES: Task = {
  name: "Equip Jammies",
  ready: () =>
    args.leg2.rolloverOutfit !== "" &&
    (getOutfits().includes(args.leg2.rolloverOutfit) ||
      getCustomOutfits().includes(args.leg2.rolloverOutfit)),
  completed: () => isWearingOutfit(args.leg2.rolloverOutfit),
  prepare: () => {
    // Prepare foldables that may be in the wrong form and make a burning cape
    const diaper = $item`stinky cheese diaper`;
    const knife = $item`Loathing Legion knife`;
    const cape = $item`burning cape`;
    outfitPieces(args.leg2.rolloverOutfit).forEach((item) => {
      switch (item) {
        case diaper:
          if (!have(diaper)) cliExecute(`fold ${diaper}`);
          break;
        case knife:
          if (!have(knife)) cliExecute(`fold ${knife}`);
          break;
        case cape:
          if (!have(cape)) {
            if (!have($item`burning newspaper`)) buy($item`burning newspaper`);

            if (have($item`burning newspaper`)) create(cape);
          }
          break;
      }
    });
  },
  outfit: () => {
    const outfit = new Outfit();
    outfitPieces(args.leg2.rolloverOutfit).forEach((item) => {
      outfit.equip(item);
    });

    if (have($familiar`Left-Hand Man`)) {
      outfit.familiar = $familiar`Left-Hand Man`;
      if (have($item`green LavaCo Lamp™`))
        outfit.equip($item`green LavaCo Lamp™`, $slot`familiar`);
      else if (have($item`red LavaCo Lamp™`))
        outfit.equip($item`red LavaCo Lamp™`, $slot`familiar`);
      else if (have($item`blue LavaCo Lamp™`))
        outfit.equip($item`blue LavaCo Lamp™`, $slot`familiar`);
    }

    return outfit;
  },
  do: () => cliExecute(`outfit ${args.leg2.rolloverOutfit}`),
};
