import { Task } from "grimoire-kolmafia";
import { use } from "kolmafia";
import { $item, get, haveInCampground } from "libram";

const meatMaid = $item`Meat maid`;
const meatButler = $item`Meat Butler`;
const clockworkMaid = $item`clockwork maid`;

const CLOCKWORK_MAID: Task = {
  name: "Install Clockwork Maid",
  completed: haveMaid,
  acquire: [
    {
      item: clockworkMaid,
      price: get("valueOfAdventure") * 8 * 0.75,
    },
  ],
  do: () => use(clockworkMaid),
};

const MEAT_MAID: Task = {
  name: "Install Meat Maid",
  completed: haveMaid,
  acquire: [
    {
      item: meatMaid,
      price: get("valueOfAdventure") * 4 * 0.75,
    },
  ],
  do: () => use(meatMaid),
};

const MEAT_BUTLER: Task = {
  name: "Install Meat Butler",
  completed: haveMaid,
  acquire: [
    {
      item: meatButler,
      price: 962 * 0.75,
    },
  ],
  do: () => use(meatButler),
};

function haveMaid(): boolean {
  return (
    haveInCampground(meatMaid) || haveInCampground(meatButler) || haveInCampground(clockworkMaid)
  );
}

export const FILL_MAID: Task[] = [CLOCKWORK_MAID, MEAT_MAID, MEAT_BUTLER];
