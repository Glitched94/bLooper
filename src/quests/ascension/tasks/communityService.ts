import { Task } from "grimoire-kolmafia";
import { getPermedSkills, myPath, Skill, visitUrl } from "kolmafia";
import { $item, ascend, get, have, Lifestyle } from "libram";
import { args } from "../../../lib/args";

const calzone = $item`Calzone of Legend`;
const pizza = $item`Pizza of Legend`;
const deepDish = $item`Deep Dish of Legend`;
const time = $item`borrowed time`;
const angle = $item`non-Euclidean angle`;
const tobiko = $item`tobiko marble soda`;
const wasabi = $item`wasabi marble soda`;
const dinsey = $item`one-day ticket to Dinseylandfill`;
const PREPARE_PULLS: Task = {
  name: "Prepare Pulls",
  acquire: [
    {
      item: calzone,
      price: 50 * get("valueOfAdventure"),
    },
    {
      item: pizza,
      price: 50 * get("valueOfAdventure"),
    },
    {
      item: deepDish,
      price: 50 * get("valueOfAdventure"),
    },
    {
      item: time,
    },
    {
      item: angle,
    },
    {
      item: tobiko,
    },
    {
      item: wasabi,
    },
    {
      item: dinsey,
    },
  ],
  completed: haveCsPulls,
  do: () => {},
};

const ASCEND: Task = {
  name: "Ascend",
  completed: () => myPath() === args.afterlife.path,
  do: () => {
    const perms = getPermedSkills();
    const permSkills = new Map(
      Skill.all()
        .filter((s) => have(s) && !perms[s.name] && s.permable)
        .map((s) => [
          s,
          args.afterlife.permType === "hc" ? Lifestyle.hardcore : Lifestyle.softcore,
        ]),
    );

    visitUrl("council.php");
    ascend({
      consumable: args.afterlife.astralDeli,
      pet: args.afterlife.astralPet,
      lifestyle: args.afterlife.lifestyle,
      playerClass: args.afterlife.class,
      kolGender: args.afterlife.gender,
      path: args.afterlife.path,
      moon: args.afterlife.moonSign,
      permOptions: {
        neverAbort: true,
        permSkills,
      },
    });
  },
};

export const CS_ASCEND_TASKS: Task[] = [PREPARE_PULLS, ASCEND];

function haveCsPulls(): boolean {
  return (
    have(calzone) &&
    have(pizza) &&
    have(deepDish) &&
    have(time) &&
    have(angle) &&
    have(tobiko) &&
    have(wasabi) &&
    have(dinsey)
  );
}
