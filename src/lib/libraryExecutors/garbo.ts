import { buy, canAdventure, cliExecute, haveEquipped, print, use } from "kolmafia";
import { $item, $location, get, have } from "libram";

import { args } from "../args";

export function executeGarbo(leg: number, ascending: boolean, nobarf: boolean = false): void {
  const command = buildGarboCommand(leg, ascending, nobarf);
  print(`Running garbo with command '${command}'`, "teal");
  const success = cliExecute(`garbo ${command}`);
  if (!success) throw `Failed to execute garbo with command '${command}'`;
}

function buildGarboCommand(leg: number, ascending: boolean, nobarf: boolean): string {
  const commandStrings = ["candydish"];

  if (nobarf) {
    commandStrings.push("nobarf");
  }

  if (ascending) {
    commandStrings.push("ascend");
  }

  if (hasYachtzeeAccess(leg)) {
    commandStrings.push("yachtzeechain");
    0;
  }

  if (leg === 1) {
    if (args.leg1.leg1Workshed !== $item.none) {
      commandStrings.push(`workshed="${args.leg1.leg1Workshed}"`);
    }
  } else {
    if (args.leg2.leg2Workshed !== $item.none) {
      commandStrings.push(`workshed="${args.leg2.leg2Workshed}"`);
    }
  }

  return commandStrings.join(" ");
}

function hasYachtzeeAccess(leg: number): boolean {
  if (canAdventure($location`The Sunken Party Yacht`)) return true;
  if (leg !== 1) return false;

  if (
    args.leg1.buyDaypass &&
    (have($item`Jurassic Parka`) || haveEquipped($item`Jurassic Parka`)) &&
    have($item`Cincho de Mayo`) &&
    have($item`Clara's bell`)
  ) {
    if (get("_spikolodonSpikeUses") === 0 && get("_claraBellUsed") === false) {
      const sbb = $item`one-day ticket to Spring Break Beach`;
      if (!have(sbb)) buy(1, sbb, 600_000);

      if (!have(sbb)) return false;

      use(1, sbb);
      return true;
    }
  }

  return false;
}
