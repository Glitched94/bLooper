import { Args } from "grimoire-kolmafia";
import { Class, Item, Path } from "kolmafia";
import { $class, $item, $path } from "libram";

import { allGardenAliases, stringToGardenItem } from "./aliases/garden";
import { allWorkshedAliases, stringToWorkshedItem } from "./aliases/workshed";
import { allAstralDeliAliases, stringToAstralDeliItem } from "./aliases/astralDeli";
import { allAstralPetAliases, stringToAstralPet } from "./aliases/astralPet";
import { allClasses, stringToClass } from "./aliases/class";
import { allPathAliases, stringToPath } from "./aliases/path";
import { BIG_BOOK_USED } from "./constants";

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
    global: Args.group("Global Preferences", {
        eventList: Args.string({
            setting: "tptb.bLooper.eventList",
            default: "",
            hidden: true,
        }),
        homeClan: Args.string({
            setting: "tptb.bLooper.homeClan",
            help: "Your home clan. The script will ensure you are in this clan at the start of each leg of the loop.",
            default: "",
        }),
    }),
    leg1: Args.group("Leg 1 Preferences", {
        buyDaypass: Args.flag({
            setting: "tptb.bLooper.buyDaypass",
            help: "Set to 'true' if you'd like to attempt purchasing a one-day pass to Spring Break Beach for yachtzeechaining.",
            default: false,
        }),
        leg1Workshed: Args.custom<Item>({
            setting: "tptb.bLooper.leg1Workshed",
            help: "The workshed you'd like the script to install at the start of Leg 1. Leave blank to ignore.",
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
        "Item"),
        garden: Args.custom<Item>({
            setting: "tptb.bLooper.preAscendGarden",
            help: "The garden you'd like the script to install at the start of Leg 1. Leave blank to ignore.",
            default: $item.none,
            options: [
                ...allGardenAliases.map(
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
        stringToGardenItem,
        "Item"),
    }),
    afterlife: Args.group("Afterlife preferences", {
        astralDeli: Args.custom<Item>({
            setting: "tptb.bLooper.astralDeli",
            help: "The name of the item you'd like to buy from the Astral Deli in the afterlife.",
            default: $item.none,
            options: [
                ...allAstralDeliAliases.map(
                    ({ item, aliases }) => [
                        item,
                        `${aliases
                            .filter((alias) => alias !== "")
                            .join(", ")}`,
                    ] as [Item, string],
                ),
                [$item.none, "leave this field blank"]
            ],
        },
        stringToAstralDeliItem,
        "Item"),
        astralPet: Args.custom<Item>({
            setting: "tptb.bLooper.astralPet",
            help: "",
            default: $item.none,
            options: [
                ...allAstralPetAliases.map(
                    ({ item, aliases }) => [
                        item,
                        `${aliases
                            .filter((alias) => alias !== "")
                            .join(", ")}`,
                    ] as [Item, string],
                ),
                [$item.none, "leave this field blank"]
            ],
        },
        stringToAstralPet,
        "Item"),
        lifestyle: Args.number({
            setting: "tptb.bLooper.lifestyle",
            help: "The type of ascension you want to run.",
            default: 2,
            options: [
                [1, "Casual"],
                [2, "Normal (or Softcore)"],
                [3, "Hardcore"]
            ]
        }),
        moonSign: Args.number({
            setting: "tptb.bLooper.moonId",
            help: "The name of the Moon Sign you want to ascend under.",
            default: 8,
            options: [
                [1, "Mongoose"],
                [2, "Wallaby"],
                [3, "Vole"],
                [4, "Platypus"],
                [5, "Opossum"],
                [6, "Marmot"],
                [7, "Wombat"],
                [8, "Blender"],
                [9, "Packrat"]
            ]
        }),
        path: Args.custom<Path>({
            setting: "tptb.bLooper.pathId",
            help: "The integer id of the ascension path you want to run.",
            default: $path`Community Service`,
            options: [
                ...allPathAliases.map(
                    ({ path, aliases }) => [
                        path,
                        `${[...aliases, toInitials(path.name)]
                            .filter((alias) => alias !== "")
                            .join(", ")}`,
                    ] as [Path, string],
                )
            ],
        },
        stringToPath,
        "Path"),
        class: Args.custom<Class>({
            setting: "tptb.bLooper.class",
            help: "",
            default: $class`Sauceror`,
            options: [
                ...allClasses.map(
                    ({ classObj, aliases }) => [
                        classObj,
                        `${aliases
                            .filter((alias) => alias !== "")
                            .join(", ")}`
                    ] as [Class, string]
                )
            ]
        },
        stringToClass,
        "Class"),
        gender: Args.number({
            setting: "tptb.bLooper.gender",
            help: "",
            default: 1,
            options: [
                [1, "Male"],
                [2, "Female"]
            ]
        }),
        permType: Args.string({
            setting: "tptb.bLooper.permType",
            help: "How should we try and permanancey skills in the afterlife?",
            default: "sc",
            options: [
                ["sc", "Softcore"],
                ["hc", "Hardcore"]
            ]
        })
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
        setting: BIG_BOOK_USED,
        default: false,
        hidden: true
    }),
});

export { stringToGardenItem };
