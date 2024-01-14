import { Task } from "grimoire-kolmafia";
import { cliExecute, getClanName, use } from "kolmafia";
import { $item, Clan, get, have } from "libram";

import { args } from "../lib/args";

const JOIN_CLAN: Task = {
  name: "Join Home Clan",
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
  completed: () => get("_bookOfEverySkillUsed"),
  do: () => use($item`The Big Book of Every Skill`),
};

export const EXTENDED_BREAKFAST = [JOIN_CLAN, BREAKFAST, DOUBLE_ICE, BIG_BOOK];
