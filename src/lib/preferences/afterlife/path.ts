import { Path, userPrompt } from "kolmafia";
import { allPathAliases, stringToPath } from "../../aliases/path";
import { $path, set } from "libram";
import { args, toInitials } from "../../args";
import { Args } from "grimoire-kolmafia";
import { preference } from "../prefType";

export {
    path as pref,
    pathPref as arg,
    setPath as init
}

const path: preference = {
    setting: "tptb.bLooper.pathId",
    help: "The integer id of the ascension path you want to run."
};

const pathPref = Args.custom<Path>({
    setting: path.setting,
    help: path.help,
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
"Path");

function setPath(): void {
    var pref = userPrompt(path.help + " Use 'blooper help showAll' to see all acceptable values for this setting.");
    set(path.setting, pref);
    args.afterlife.path = stringToPath(pref);
}