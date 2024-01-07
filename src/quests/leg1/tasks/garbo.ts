import { Task } from "grimoire-kolmafia";
import { abort, buy, canAdventure, cliExecute, haveEquipped, itemAmount, mallPrice, myAdventures, print, use } from "kolmafia";
import { $item, $location, ascend, get } from "libram";

import { LEG1GARBO } from "../../../lib/constants";
import { getBoolean } from "libram/dist/property";
import { logEvent } from "../../../eventLogging";
import { args } from "../../../lib/args";

export const GARBO: Task[] = [
    {
        name: "Essential Tofu",
        ready: () => mallPrice($item`Essential Tofu`) < 4 * get("valueOfAdventure"),
        completed: () => get("_essentialTofuUsed"),
        acquire: [
            {
                item: $item`Essential Tofu`,
                price: get("valueOfAdventure") * 4
            }
        ],
        do: () => use(1, $item`Essential Tofu`)
    },
    {
        name: "Golden Dice",
        ready: () => itemAmount($item`Glenn's Golden Dice`) > 0,
        completed: () => get("_glennGoldenDiceUsed"),
        do: () => use(1, $item`Glenn's Golden Dice`)
    },
    {
        name: "Lodestone",
        ready: () => itemAmount($item`lodestone`) > 0,
        completed: () => get("_lodestoneUsed"),
        do: () => use(1, $item`lodestone`)
    },
    {
        name: "Garbo",
        ready: () => get("ascensionsToday") === 0,
        completed: () => myAdventures() === 0,
        do: () => {
            const command = buildGarboCommand(true);

            print(`Running garbo with command '${command}'`);
            const success = cliExecute(`garbo ${command}`);
            if (!success) throw `Failed to execute garbo with ${command}`;
        },
        limit: {
            tries: 1
        }
    },
];

function buildGarboCommand(ascending: boolean): string {
    const commandStrings = ["candydish"];

    if (ascending) {
        commandStrings.push("ascend");
    }

    if (hasYachtzeeAccess()) {
        commandStrings.push("yachtzeechain");0
    }

    if (args.leg1.leg1Workshed != $item.none) {
        commandStrings.push(`workshed="${args.leg1.leg1Workshed}"`);
    }

    return commandStrings.join(" ");
}

function hasYachtzeeAccess(): boolean {
    if (canAdventure($location`The Sunken Party Yacht`))
        return true;

    if (args.leg1.buyDaypass &&
        (itemAmount($item`Jurassic Parka`) > 0 || haveEquipped($item`Jurassic Parka`)) &&
        itemAmount($item`Cincho de Mayo`) > 0 &&
        itemAmount($item`Clara's Bell`) > 0) {
        if (get("_spikolodonSpikeUses") === 0 &&
            get("_claraBellUsed") === false) {
            const sbb = $item`one-day ticket to Spring Break Beach`;
            if (itemAmount(sbb) === 0)
                buy(1, sbb, 600_000);
            
            if (itemAmount(sbb) === 0)
                return false;

            use(1, sbb);
            return true;
        }
    }

    return false;
}