import { Task } from "grimoire-kolmafia";
import { use } from "kolmafia";
import { $item, have } from "libram";

export const OPEN_RAINDOH: Task = {
  name: "Open Rain-Doh",
  ready: () => have($item`can of Rain-Doh`),
  completed: () => have($item`empty Rain-Doh can`),
  do: () => use($item`can of Rain-Doh`),
};
