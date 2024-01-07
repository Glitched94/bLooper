import { Path, print } from "kolmafia";
import { $path, $paths } from "libram";

import { stripString, toInitials } from "../args";

const unaliasedPaths = $paths`Community Service`;
export const allPathAliases = [
  ...unaliasedPaths.map((path) => {
    return { path: path, aliases: [path.name.toLowerCase()] };
  }),
];

export function stringToPath(s: string): Path {
  if (s === "") return $path`Community Service`;

  const lowercaseName = s.toLowerCase();
  const strippedName = stripString(lowercaseName);
  const validPaths = allPathAliases.filter(
    ({ path, aliases }) =>
      toInitials(path.name.toLowerCase()) === lowercaseName ||
      path.name.toLowerCase().includes(lowercaseName) ||
      stripString(path.name.toLowerCase()).includes(strippedName) ||
      aliases.some((alias) => alias === lowercaseName),
  );

  if (validPaths.length > 1) {
    print(`Invalid Path: ${s} matches multiple paths! Matched:`, "red");
    validPaths.forEach(({ path }) => print(`${path}`, "red"));
    throw new Error();
  } else if (validPaths.length === 0) {
    print(`Invalid Path: ${s} does not match any paths!`, "red");
    throw new Error();
  }

  return validPaths[0].path;
}
