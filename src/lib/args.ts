import { Args } from "grimoire-kolmafia";

export const args = Args.create("bLooper", "A re-entrant daily looping wrapper", {
    init: Args.flag({
        help: "Use for first-time setup of bLooper.",
        default: false
    })
});