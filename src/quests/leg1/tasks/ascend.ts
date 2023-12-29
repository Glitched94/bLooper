import { Quest, Task } from "grimoire-kolmafia";
import { Skill, count, getPermedSkills, max, print, visitUrl, xpath } from "kolmafia";
import { $path, $skills, Lifestyle, ascend, get, have } from "libram";

import { args } from "../../../lib/args";
import { COMMUNITY_SERVICE, PRE_ASCEND } from "../../../lib/constants";
import { logEvent } from "../../../eventLogging";

export const ASCEND: Quest<Task> = {
    name: "Ascend CS",
    ready: () => args.afterlife.path === $path`Community Service`,
    completed: () => get("ascensionsToday") === 1,
    tasks: [
        {
            name: "Ascend",
            ready: () => count(get("csServicesPerformed").split(',')) === 11,
            completed: () => visitUrl("charpane.php").includes("Astral Spirit"),
            do: () => {
                const perms = getPermedSkills();
                const permSkills = new Map(
                    Skill.all()
                        .filter((s) => have(s) && !perms[s.name] && s.permable)
                        .map((s) => [s, Lifestyle.hardcore])
                );

                visitUrl("council.php");
                logEvent(PRE_ASCEND);
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
                        permSkills
                    }
                });
            }
        },
        {
            name: "Perm Skills",
            completed: () => get("bankedKarma") <= (args.afterlife.permType === "hc" ? 211 : 111),
            do: () => {
                const permType = args.afterlife.permType;
                const buffer = visitUrl("afterlife.php?place=permery");
                const hcsc = xpath(buffer, '//form[@action="afterlife.php"]//input[@name="action"]/@value');
                const perm = xpath(buffer,'//form[@action="afterlife.php"]//input[@name="whichskill"]/@value');

                const canAfford = get("bankedKarma") / (permType ? 200 : 100);
                const loops = Math.min(perm.length, canAfford);
                for (let i = 0; i < loops; i++) {
                    if (hcsc[i] == `${permType}perm`) {
                        visitUrl(`afterlife.php?action=${permType}perm&whichskill=${perm[i]}`, true, true);
                    }
                }
            }
        }
    ]
}