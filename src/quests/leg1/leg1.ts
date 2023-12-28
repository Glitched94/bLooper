import { Quest, Task } from "grimoire-kolmafia";

import { JOIN_CLAN } from "./tasks/whitelist";
import { GARBO } from "./tasks/garbo";
import { OVERDRUNK } from "./tasks/overdrunk";
import { PRE_ASCEND } from "./tasks/ascendPrep";
import { ASCEND } from "./tasks/ascend";

export const leg1: Quest<Task>[] = [
    {
        name: "Loop Start",
        tasks: [
            JOIN_CLAN,
        ]
    },
    {
        name: "Leg 1 Garbo",
        tasks: [
            ...GARBO,
        ]
    },
    {
        name: "Ascenscion Prep",
        tasks: [
            ...PRE_ASCEND,
        ]
    },
    ...OVERDRUNK,
    ASCEND
];