import { Class, print } from "kolmafia";
import { $class } from "libram";

const classAliases = [
    { classObj: $class`Seal Clubber`, aliases: ["seal clubber", "sc"] },
    { classObj: $class`Turtle Tamer`, aliases: ["turtle tamer", "tt"] },
    { classObj: $class`Pastamancer`, aliases: ["pastamancer", "pm"] },
    { classObj: $class`Sauceror`, aliases: ["sauceror", "s"] },
    { classObj: $class`Disco Bandit`, aliases: ["disco bandit", "db"] },
    { classObj: $class`Accordion Thief`, aliases: ["accordion thief", "at"] }
]
export const allClasses = [
    ...classAliases.map(({ classObj, aliases }) => {
        return { classObj: classObj, aliases: aliases };
    }),
];

export function stringToClass(s: string): Class {
    if (s === "") return $class`Sauceror`;

    const lowerCaseName = s.toLowerCase();
    const validClasses = allClasses.filter(
        ({ aliases }) =>
            aliases.some((alias) => alias === lowerCaseName),
    );

    if (validClasses.length > 1) {
        print(`Invalid Class: ${s} matches multipel classes! Matched:`, "red");
        validClasses.forEach(({ classObj }) => print(`${classObj}`, "red"));
        throw new Error();
    } else if (validClasses.length === 0) {
        print(`Invalid Class: ${s} does not match any classes!`, "red");
        throw new Error();
    }

    return validClasses[0].classObj;
}