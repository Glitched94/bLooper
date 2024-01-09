import { Quest, Task } from "grimoire-kolmafia";
import { count, getPermedSkills, Skill, visitUrl } from "kolmafia";
import { $path, ascend, get, have, Lifestyle } from "libram";

import { args } from "../../../lib/args";

export const ASCEND: Quest<Task> = {
  name: "Ascend CS",
  ready: () => get("ascensionsToday") === 0 && args.afterlife.path === $path`Community Service`,
  completed: () => get("ascensionsToday") === 1,
  tasks: [
    {
      name: "Ascend",
      ready: () => count(get("csServicesPerformed").split(",")) === 11,
      completed: () => visitUrl("charpane.php").includes("Astral Spirit"),
      do: () => {
        const perms = getPermedSkills();
        const permSkills = new Map(
          Skill.all()
            .filter((s) => have(s) && !perms[s.name] && s.permable)
            .map((s) => [s, Lifestyle.hardcore]),
        );

        visitUrl("council.php");
        ascend({
          path: args.afterlife.path,
          playerClass: args.afterlife.class,
          lifestyle: args.afterlife.lifestyle,
          kolGender: args.afterlife.gender,
          moon: args.afterlife.moonSign,
          consumable: args.afterlife.astralDeli,
          pet: args.afterlife.astralPet,
          permOptions: {
            neverAbort: true,
            permSkills,
          },
        });
      },
    },
  ],
};
