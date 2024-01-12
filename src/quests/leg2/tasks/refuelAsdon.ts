import { Task } from "grimoire-kolmafia";
import { getWorkshed } from "kolmafia";
import { $item, AsdonMartin, have } from "libram";

export const REFUEL_ASDON: Task = {
  name: "Refuel Asdon",
  ready: () => getWorkshed() === $item`Asdon Martin keyfob (on ring)`,
  completed: () => have(AsdonMartin.Driving.Observantly, 1260),
  do: () => AsdonMartin.drive(AsdonMartin.Driving.Observantly, 1260),
};
