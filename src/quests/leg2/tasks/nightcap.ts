import { Task } from "grimoire-kolmafia";
import { cliExecute, inebrietyLimit, myInebriety } from "kolmafia";

export const NIGHTCAP: Task = {
  name: "Nightcap",
  completed: () => myInebriety() > inebrietyLimit(),
  do: () => cliExecute("CONSUME ALL NIGHTCAP"),
};
