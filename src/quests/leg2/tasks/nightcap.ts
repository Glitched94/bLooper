import { Task } from "grimoire-kolmafia";
import { cliExecute, inebrietyLimit, myInebriety } from "kolmafia";
import { $familiar } from "libram";

export const NIGHTCAP: Task = {
  name: "Nightcap",
  outfit: {
    familiar: $familiar`Stooper`,
  },
  completed: () => myInebriety() > inebrietyLimit() + 1,
  do: () => cliExecute("CONSUME ALL NIGHTCAP"),
};
