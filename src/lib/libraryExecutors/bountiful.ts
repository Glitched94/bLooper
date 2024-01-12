import { cliExecute, visitUrl } from "kolmafia";
import { get } from "libram";

export function executeBountiful(): void {
  const success = cliExecute("bountiful hunt all");
  if (!success)
    throw `Failed to run 'bountiful hunt all'. Please check what went wrong and try again.`;
}

export function bountiesComplete(): boolean {
  visitUrl("bounty.php");

  const easyDone = get("_untakenEasyBountyItem") === "" && get("currentEasyBountyItem") === "";
  const hardDone = get("_untakenHardBountyItem") === "" && get("currentHardBountyItem") === "";
  const specDone =
    get("_untakenSpecialBountyItem") === "" && get("currentSpecialBountyItem") === "";

  return easyDone && hardDone && specDone;
}
