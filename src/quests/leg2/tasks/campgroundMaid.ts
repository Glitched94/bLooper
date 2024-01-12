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
      price: get("valueOfAdventure") * 3,
    },
  ],
  do: () => use(clockworkMaid),
};

const MEAT_BUTLER: Task = {
  name: "Install Meat Butler",
  completed: haveMaid,
  acquire: [
    {
      item: meatButler,
      price: (get("valueOfAdventure") * 3) + 941,
    },
  ],
  do: () => use(meatButler),
};

const MEAT_MAID: Task = {
  name: "Install Meat Maid",
  completed: haveMaid,
  acquire: [
    {
      item: meatMaid,
      price: get("valueOfAdventure") * 3,
    },
  ],
  do: () => use(meatMaid),
};

function haveMaid(): boolean {
  return (
    haveInCampground(meatMaid) || haveInCampground(meatButler) || haveInCampground(clockworkMaid)
  );
}

export const FILL_MAID: Task[] = [CLOCKWORK_MAID, MEAT_BUTLER, MEAT_MAID];
