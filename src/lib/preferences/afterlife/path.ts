import { Args } from "grimoire-kolmafia";
import { Path, userPrompt } from "kolmafia";
import { $path, set } from "libram";

import { allPathAliases, stringToPath } from "../../aliases/path";
import { args, toInitials } from "../../args";
import { preference } from "../preference";

export { path as pref, pathPref as arg, setPath as init };

const path: preference = {
  setting: "tptb.bLooper.pathId",
  help: "The integer id of the ascension path you want to run.",
};

const pathPref = Args.custom<Path>(
  {
    setting: path.setting,
    help: path.help,
    default: $path`Community Service`,
    options: [
      ...allPathAliases.map(
        ({ path, aliases }) =>
          [
            path,
            `${[...aliases, toInitials(path.name)].filter((alias) => alias !== "").join(", ")}`,
          ] as [Path, string],
      ),
    ],
  },
  stringToPath,
  "Path",
);

function setPath(): void {
  var pref = userPrompt(
    path.help + " Use 'blooper help options' to see all acceptable values for this setting.",
  );
  set(path.setting, pref);
  args.afterlife.path = stringToPath(pref);
}
