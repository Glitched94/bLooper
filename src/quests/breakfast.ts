import { Task } from "grimoire-kolmafia";
import { cliExecute, getClanName, use } from "kolmafia";
import { $item, Clan, get, have, set } from "libram";

import { args } from "../lib/args";
import * as constants from "../lib/constants";

const JOIN_CLAN: Task = {
  name: `Join ${args.global.homeClan}`,
  ready: () => args.global.homeClan !== "",
  completed: () => getClanName() === args.global.homeClan,
  do: () => Clan.join(args.global.homeClan),
};

const BREAKFAST: Task = {
  name: "Breakfast",
  completed: () => get("breakfastCompleted"),
  do: () => cliExecute("breakfast"),
};

const DOUBLE_ICE: Task = {
  name: "Double Ice",
  completed: () => get("_aprilShower"),
  do: () => cliExecute("shower ice"),
};

const BIG_BOOK: Task = {
  name: "Big Book of Every Skill",
  ready: () => have($item`The Big Book of Every Skill`),
  completed: () => args.bigBookUsed,
  do: () => {
    use($item`The Big Book of Every Skill`);
    set(constants.BIG_BOOK_USED, true);
    args.bigBookUsed = true;
  },
};

export const EXTENDED_BREAKFAST = [JOIN_CLAN, BREAKFAST, DOUBLE_ICE, BIG_BOOK];
