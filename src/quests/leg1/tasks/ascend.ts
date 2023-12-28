import { Quest, Task } from "grimoire-kolmafia";
import { count, visitUrl } from "kolmafia";
import { get } from "libram";

export const ASCEND: Quest<Task> = {
    name: "Ascend CS",
    completed: () => get("ascensionsToday") === 1,
    tasks: [
        {
            name: "Ascend",
            ready: () => count(get("csServicesPerformed").split(',')) === 11,
            completed: () => visitUrl("charpane.php").includes("Astral Spirit"),
            do: () => {
                visitUrl("council.php", false, false);
                visitUrl("ascend.php?pwd&action=ascend&confirm=on&confirm2=on", true, true);
            }
        }
    ]
}