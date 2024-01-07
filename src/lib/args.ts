import { Args } from "grimoire-kolmafia";
import { Item } from "kolmafia";
import { $item } from "libram";

import { allWorkshedAliases, stringToWorkshedItem } from "./aliases/workshed";
import * as constants from "./constants";

export function toInitials(s: string): string {
    const initials = s
        .split(" ")
        .map((term) => term[0])
        .join("");
        return initials.length >= 3 ? initials : "";
}

export function stripString(s: string): string {
    if (s.includes(" ")) return stripString(s.replace(" ", ""));
    if (s.includes("-")) return stripString(s.replace("-", ""));
    return s;
}

export const args = Args.create("bLooper", "A re-entrant daily looping wrapper", {
    init: Args.flag({
        help: "Use for first-time setup of bLooper.",
        default: false
    }),
    showAll: Args.flag({
        help: "Use this to see all options for the preferences in this help menu. By default, none will be shown.",
        default: false,
    }),
    global: Args.group("Global Preferences", {
        eventList: constants.eventList.arg,
        homeClan: constants.homeClan.arg,
    }),
    leg1: Args.group("Leg 1 Preferences", {
        buyDaypass: constants.buyDaypass.arg,
        leg1Workshed: constants.leg1Workshed.arg,
        preAscendGarden: constants.preAscendGarden.arg,
    }),
    afterlife: Args.group("Afterlife preferences", {
        astralDeli: constants.astralDeli.arg,
        astralPet: constants.astralPet.arg,
        lifestyle: constants.lifestyle.arg,
        moonSign: constants.moonSign.arg,
        path: constants.path.arg,
        class: constants.ascendClass.arg,
        gender: constants.gender.arg,
        permType: constants.permType.arg
    }),
    leg2: Args.group("Leg 2 Preferences", {
        leg2Workshed: Args.custom<Item>({
            setting: "tptb.bLooper.leg2Workshed",
            help: "The workshed you'd like the script to install at the start of Leg 2. Leave blank to ignore.",
            default: $item.none,
            options: [
                ...allWorkshedAliases.map(
                    ({ item, aliases }) => [
                        item,
                        `${[...aliases, toInitials(item.name.toLowerCase())]
                            .filter((alias) => alias !== "")
                            .join(", ")}`,
                    ] as [Item, string],
                ),
                [$item.none, "leave this field blank"]
            ],
        },
        
        stringToWorkshedItem,
        "Item")
    }),
    // Hidden properties
    bigBookUsed: Args.boolean({
        setting: constants.BIG_BOOK_USED,
        default: false,
        hidden: true
    }),
});