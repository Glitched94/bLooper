import { Args, getTasks } from "grimoire-kolmafia";

import { LEG_1 } from "../quests/leg1/leg1";
import { LEG_1_OVERDRUNK } from "../quests/leg1/leg1Overdrunk";

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

export const args = Args.create(
  "bLooper",
  "A re-entrant daily looping wrapper for Community Service. Heavily inspired by Prusias' pLooper script",
  {
    init: Args.flag({
      setting: "",
      help: "Use for first-time setup of bLooper.",
      default: false,
    }),
    options: Args.flag({
      setting: "",
      help: "Use this to see all options for the preferences in this help menu. By default, none will be shown.",
      default: false,
    }),
    global: Args.group(
      "Global Preferences - These preferences can and are used at several point throughout the script.",
      {
        eventList: constants.eventList.arg,
        homeClan: constants.homeClan.arg,
        getBounties: constants.getBounties.arg,
        abortBefore: Args.string({
          setting: "tptb.bLooper.abortBefore",
          help: "The script will abort execution before running the task specified here. The task name must be fully qualified in order to successfully abort.",
          options: [...getTasks([LEG_1, ...LEG_1_OVERDRUNK]).map(({ name }) => [name] as [string])],
        }),
      },
    ),
    leg1: Args.group(
      "Leg 1 Preferences - These preferences modify behavior during Leg 1 (pre-ascension) of your daily loop.",
      {
        buyDaypass: constants.buyDaypass.arg,
        leg1ValueOfAdventure: constants.leg1ValueOfAdventure.arg,
        leg1Workshed: constants.leg1Workshed.arg,
        preAscendGarden: constants.preAscendGarden.arg,
        wineglassValueOfAdventure: constants.wineglassValueOfAdventure.arg,
      },
    ),
    afterlife: Args.group(
      "Afterlife Preferences - These preferences control actions taken in Valhalla, including what choices to make when reincarnating.",
      {
        astralDeli: constants.astralDeli.arg,
        astralPet: constants.astralPet.arg,
        permType: constants.permType.arg,

        lifestyle: constants.lifestyle.arg,
        class: constants.ascendClass.arg,
        gender: constants.gender.arg,
        path: constants.path.arg,
        moonSign: constants.moonSign.arg,
      },
    ),
    leg2: Args.group(
      "Leg 2 Preferences - These preferences modify behavior during Leg 2 (post-ascension) of your daily loop.",
      {
        ascensionScript: constants.ascensionScript.arg,
        leg2Workshed: constants.leg2Workshed.arg,
        leg2ValueOfAdventure: constants.leg2ValueOfAdventure.arg,
      },
    ),

    // Hidden properties
    bigBookUsed: Args.boolean({
      setting: constants.BIG_BOOK_USED,
      default: false,
      hidden: true,
    }),
  },
);
