import { Task } from "grimoire-kolmafia";
import { cliExecute, Effect } from "kolmafia";
import { $effect, have } from "libram";

export const SHRUG_AT: Task = {
  name: "Shrug AT Songs",
  completed: () => !haveShruggableBuffs(),
  do: () => {
    shrug(stevedave);
    shrug(arrowsmith);
    shrug(madrigal);
    shrug(melody);
    shrug(cletus);
    shrug(jackass);
    shrug(brawnee);
  },
};

function shrug(effect: Effect): void {
  cliExecute(`shrug ${effect}`);
}

const stevedave = $effect`Stevedave's Shanty of Superiority`;
const arrowsmith = $effect`Power Ballad of the Arrowsmith`;
const madrigal = $effect`The Moxious Madrigal`;
const melody = $effect`The Magical Mojomuscular Melody`;
const cletus = $effect`Cletus's Canticle of Celerity`;
const jackass = $effect`Jackasses' Symphony of Destruction`;
const brawnee = $effect`Brawnee's Anthem of Absorption`;
function haveShruggableBuffs(): boolean {
  return (
    have(stevedave) ||
    have(arrowsmith) ||
    have(madrigal) ||
    have(melody) ||
    have(cletus) ||
    have(jackass) ||
    have(brawnee)
  );
}
