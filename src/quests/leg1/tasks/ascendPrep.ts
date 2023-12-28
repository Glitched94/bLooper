import { Task } from "grimoire-kolmafia";
import { Item, availableAmount, cliExecute, closetAmount, haveEquipped, inebrietyLimit, itemAmount, myGardenType, myInebriety, use } from "kolmafia";
import { $familiar, $item, get } from "libram";

import { args, stringToGardenItem } from "../../../lib/args";

export const PRE_ASCEND: Task[] = [
    {
        name: "Plant Garden",
        ready: () => args.leg1.garden !== $item.none && itemAmount(args.leg1.garden) > 0,
        completed: () => stringToGardenItem(myGardenType()) === args.leg1.garden,
        do: () => {
            cliExecute("garden pick");
            use(1, args.leg1.garden);
        }
    },
    {
        name: "Stillsuit",
        ready: () => itemAmount($item`tiny stillsuit`) > 0 || haveEquipped($item`tiny stillsuit`),
        outfit: {
            familiar: $familiar`Stooper`,
        },
        completed: () => get("familiarSweat") < 10,
        do: () => cliExecute("drink stillsuit distillate")
    },
    {
        name: "CONSUME",
        completed: () => myInebriety() === inebrietyLimit(),
        do: () => cliExecute("CONSUME ALL"),
    },
    {
        name: "Prepare Pulls",
        acquire: [
            {
                item: $item`calzone of legend`,
                price: 50 * get("valueOfAdventure")
            },
            {
                item: $item`pizza of legend`,
                price: 50 * get("valueOfAdventure")
            },
            {
                item: $item`deep dish of legend`,
                price: 50 * get("valueOfAdventure")
            },
            {
                item: $item`borrowed time`
            },
            {
                item: $item`non-Euclidean angle`
            },
            {
                item: $item`tobiko marble soda`
            },
            {
                item: $item`wasabi marble soda`
            },
            {
                item: $item`one-day ticket to Dinseylandfill`
            }
        ],
        completed: () => haveCsPulls(),
        do: () => { }
    }
];

function getGardenItem(garden: string): Item {
    switch (garden) {
        case "pumpkin":
            return $item`packet of pumpkin seeds`;
        case "peppermint":
            return $item`Peppermint Pip Packet`;
        case "skeleton":
            return $item`packet of dragon's teeth`;
        case "beer":
            return $item`packet of beer seeds`;
        case "winter":
            return $item`packet of winter seeds`;
        case "thanksgarden":
            return $item`packet of thanksgarden seeds`;
        case "grass":
            return $item`packet of tall grass seeds`;
        case "mushroom":
            return $item`packet of mushroom seeds`;
        case "rock":
            return $item`packet of rock seeds`;
        default:
            return $item.none;
    }
}

function haveCsPulls(): boolean {
    return availableAmount($item`calzone of legend`) > 0
        && availableAmount($item`pizza of legend`) > 0
        && availableAmount($item`deep dish of legend`) > 0
        && availableAmount($item`borrowed time`) > 0
        && availableAmount($item`non-Euclidean angle`) > 0
        && availableAmount($item`tobiko marble soda`) > 0
        && availableAmount($item`wasabi marble soda`) > 0
        && availableAmount($item`one-day pass to Dinseylandfill`) > 0;
}