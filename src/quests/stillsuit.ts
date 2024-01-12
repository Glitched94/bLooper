import { Task } from "grimoire-kolmafia";
import { cliExecute, inebrietyLimit, myInebriety } from "kolmafia";
import { $familiar, $item, get, have } from "libram";

const stillsuit = $item`tiny stillsuit`;
export const STILLSUIT: Task = {
  name: "Tiny Stillsuit",
  ready: () => have(stillsuit),
  outfit: {
    familiar: $familiar`Stooper`,
    famequip: stillsuit,
  },
  completed: () => myInebriety() > inebrietyLimit() || get("familiarSweat") < 10,
  do: () => cliExecute("drink stillsuit distillate"),
};
