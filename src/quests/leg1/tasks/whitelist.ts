import { Task } from "grimoire-kolmafia";
import { cliExecute, getClanName } from "kolmafia";

import { args } from "../../../lib/args";

export const JOIN_CLAN: Task = {
    name: "Whitelist",
    completed: () => getClanName() === args.global.homeClan,
    do: () => cliExecute(`/whitelist ${args.global.homeClan}`)
};