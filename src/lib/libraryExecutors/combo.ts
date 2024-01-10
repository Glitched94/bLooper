import { buy, cliExecute, mallPrice, myAdventures, use } from "kolmafia";
import { $item, have } from "libram";

export function executeCombo(): void {
  const success = cliExecute(`combo ${myAdventures()}`);
  if (!success) throw `Failed to run combo successfully, please check what went wrong.`;

  if (myAdventures() > 0)
    throw `Failed to spend all of our turns running combo, please check what went wrong.`;
}

export function comboReady(): boolean {
  if (have($item`Beach Comb`)) return true;

  if (!have($item`driftwood beach comb`)) {
    const sandprice = mallPrice($item`grain of sand`) * 3;
    const combPrice = mallPrice($item`piece of driftwood`);
    const advLimit = combPrice / sandprice;

    if (myAdventures() > advLimit) {
      buy($item`piece of driftwood`);
      use($item`piece of driftwood`);
    }
  }

  return have($item`driftwood beach comb`);
}
