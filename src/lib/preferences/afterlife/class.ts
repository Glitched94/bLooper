import { Class, userPrompt } from "kolmafia";
import { allClasses, stringToClass } from "../../aliases/class";
import { $class, set } from "libram";
import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";
import { args } from "../../args";

export {
    ascendClass as pref,
    ascendClassPref as arg,
    setAscendClass as init
}

const ascendClass: preference = {
    setting: "tptb.bLooper.class",
    help: ""
}

const ascendClassPref = Args.custom<Class>({
    setting: ascendClass.setting,
    help: ascendClass.help,
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
"Class");

function setAscendClass(): void {
    var pref = userPrompt(ascendClass.help + " Use 'blooper help options' to see all acceptable values for this setting.");
    set(ascendClass.setting, pref);
    args.afterlife.class = stringToClass(pref);
}