import { buy, canAdventure, cliExecute, haveEquipped, itemAmount, print, use } from "kolmafia";
import { $item, $location, get } from "libram";

import { args } from "./args";

export function executeGarbo(ascending: boolean, nobarf: boolean = false): void {
  const command = buildGarboCommand(ascending, nobarf);
  print(`Running garbo with command '${command}'`, "teal");
  const success = cliExecute(`garbo ${command}`);
  if (!success) throw `Failed to execute garbo with command '${command}'`;
}

function buildGarboCommand(ascending: boolean, nobarf: boolean): string {
  const commandStrings = ["candydish"];

  if (nobarf) {
    commandStrings.push("nobarf");
  }

  if (ascending) {
    commandStrings.push("ascend");
  }

  if (hasYachtzeeAccess()) {
    commandStrings.push("yachtzeechain");
    0;
  }

  if (args.leg1.leg1Workshed !== $item.none) {
    commandStrings.push(`workshed="${args.leg1.leg1Workshed}"`);
  }

  return commandStrings.join(" ");
}

function hasYachtzeeAccess(): boolean {
  if (canAdventure($location`The Sunken Party Yacht`)) return true;

  if (
    args.leg1.buyDaypass &&
    (itemAmount($item`Jurassic Parka`) > 0 || haveEquipped($item`Jurassic Parka`)) &&
    itemAmount($item`Cincho de Mayo`) > 0 &&
    itemAmount($item`Clara's bell`) > 0
  ) {
    if (get("_spikolodonSpikeUses") === 0 && get("_claraBellUsed") === false) {
      const sbb = $item`one-day ticket to Spring Break Beach`;
      if (itemAmount(sbb) === 0) buy(1, sbb, 600_000);

      if (itemAmount(sbb) === 0) return false;

      use(1, sbb);
      return true;
    }
  }

  return false;
}
