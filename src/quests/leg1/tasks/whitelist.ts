import { Task } from "grimoire-kolmafia";
import { cliExecute, getClanName } from "kolmafia";
import { HOME_CLAN } from "../../../lib/constants";
import { get } from "libram";

export const JOIN_CLAN: Task = {
    name: "Whitelist",
    completed: () => getClanName() === get(HOME_CLAN),
    do: () => cliExecute(`/whitelist ${get(HOME_CLAN)}`)
};