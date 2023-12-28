import { Task } from "grimoire-kolmafia";
import { availableAmount, cliExecute, use } from "kolmafia";
import { $item } from "libram";
import { BIG_BOOK_USED } from "../../../lib/constants";
import { get, getBoolean, set } from "libram/dist/property";

export const DAILY_TASKS: Task[] = [
    {
        name: "Breakfast",
        completed: () => get("breakfastCompleted"),
        do: () => cliExecute("breakfast")
    },
    {
        name: "Double Ice",
        completed: () => get("_aprilShower"),
        do: () => cliExecute("shower ice")
    },
    {
        name: "Big Book",
        ready: () => availableAmount($item`The Big Book of Every Skill`) > 0,
        completed: () => getBoolean(BIG_BOOK_USED),
        do: () => {
            use($item`The Big Book of Every Skill`);
            set(BIG_BOOK_USED, true);
        }
    }
]