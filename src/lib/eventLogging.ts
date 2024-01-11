import {
  autosellPrice,
  getRelated,
  historicalAge,
  historicalPrice,
  isNpcItem,
  Item,
  mallPrice,
  myHash,
  npcPrice,
  print,
  printHtml,
  todayToString,
  toItem,
  toString,
} from "kolmafia";
import { $item, $items, get, set, sum } from "libram";
import { Snapshot } from "snapshot-libram";

import { args } from "./args";
import { eventList } from "./constants";

export { logEvent, printAllDiff };

function checkDate(): void {
  const now = todayToString();
  const lastRun = get("tptb.bLooper.lastRun");

  // If the last logs are from today, we're good to keep adding to the same list
  if (lastRun === now) return;

  // Otherwise, reset the eventList and lastRun date
  args.global.eventList = "";
  set(eventList.pref.setting, "");
  set("tptb.bLooper.lastRun", now);
}

function logEvent(event: string): void {
  checkDate();

  const events = args.global.eventList.split(",");

  if (events.includes(event)) {
    logEvent(`${event}1`);
    return;
  }

  const snapshot = Snapshot.current();
  snapshot.toFile(event);

  if (events[0] === "") {
    events[0] = event;
  } else {
    events.push(event);
  }

  args.global.eventList = events.toString();
  set(eventList.pref.setting, events.toString());
}

function printAllDiff(): void {
  const events = args.global.eventList.split(",");
  const lastRun = get("tptb.bLooper.lastRun");

  if (events.length < 2) {
    print("Not enough events logged today to compare.", "red");
    return;
  }

  const event1 = events[0];
  const event2 = events[events.length - 1];

  printHtml(`<font color=0000ff><b>Now comparing all events from ${lastRun}...</b></font>`);
  printEventDiff(event1, event2);
}

type ItemReport = {
  item: Item;
  qty: number;
  totalPrice: number;
};

function printEventDiff(event1: string, event2: string): void {
  // Get two event. We'll assume event2 is later than event1
  const event1Snapshot = Snapshot.fromFile(event1);
  const event2Snapshot = Snapshot.fromFile(event2);

  // Diff the two events
  const eventDiff = event2Snapshot.diff(event1Snapshot);
  const mpa = event2Snapshot.computeMPA(event1Snapshot, { value: itemValue });

  const report: ItemReport[] = [];
  eventDiff.items.forEach((qty, item) => {
    report.push({
      item,
      qty,
      totalPrice: itemValue(item) * qty,
    });
  });

  const sortedReport = report.sort((a, b) => a.totalPrice - b.totalPrice);

  printHtml("<b>**********************************<b>");
  if (sortedReport.length >= 10) {
    for (let i = 0; i < 10; i++) {
      const lineItem = sortedReport[i];
      print(`${lineItem.qty} ${lineItem.item}: ${lineItem.totalPrice}`);
    }
  }
  print("---------------------------------");
  if (sortedReport.length >= 20) {
    for (let i = sortedReport.length - 1; i > sortedReport.length - 11; i--) {
      const lineItem = sortedReport[i];
      print(`${lineItem.qty} ${lineItem.item}: ${lineItem.totalPrice}`);
    }
  }
  printHtml("<b>**********************************<b>");

  printHtml("<b>Summary:</b>");
  print(`You've earned ${toString(mpa.mpa.items, "%,d")} in item differences.`, "teal");
  printHtml(`<font color=cc5500>You've earned ${toString(mpa.values.meat, "%,d")} liquid meat.`);
  printHtml(
    `You've spent ${mpa.turns} adventures for a total (meat + item) <b>${mpa.mpa.total} mpa</b>.`,
  );
  print(
    `You've earned a total of ${toString(
      mpa.values.total,
      "%,d",
    )} meat between ${event1} and ${event2}.`,
    "teal",
  );
  print("");
}

function itemValue(item: Item): number {
  switch (item) {
    case $item`Mob Penguin cellular phone`:
      return 0;
    case $item`Loathing Idol Microphone (75% charged)`:
      return 0.75 * itemValue($item`Loathing Idol Microphone`);
    case $item`Loathing Idol Microphone (50% charged)`:
      return 0.5 * itemValue($item`Loathing Idol Microphone`);
    case $item`Loathing Idol Microphone (25% charged)`:
      return 0.25 * itemValue($item`Loathing Idol Microphone`);
  }

  function specialValue(item: Item) {
    switch (item) {
      case $item`Spooky Putty monster`:
        return itemValue($item`Spooky Putty sheet`);
      case $item`empty Rain-Doh can`:
        return itemValue($item`can of Rain-Doh`);
      case $item`coffee pixie stick`:
        return itemValue($item`Game Grid ticket`) * 10;
      case $item`roll of Hob-Os`:
        return (
          4.5 *
          averageValue(
            $items`sterno-flavored Hob-O, frostbite-flavored Hob-O, fry-oil-flavored Hob-O, strawberry-flavored Hob-O, garbage-juice-flavored Hob-O`,
          )
        );
      case $item`BRICKO brick`:
        return 90;
      case $item`BRICKO trunk`:
        return 5 * itemValue($item`BRICKO brick`) + itemValue($item`BRICKO eye brick`) / 10;
      case $item`d4`:
        return 2.5 * itemValue($item`generic restorative potion`);
      case $item`d6`:
        return 3.5 * itemValue($item`generic mana potion`);
      case $item`d8`:
        return 4.5 * itemValue($item`generic healing potion`);
      case $item`bag of park garbage`:
        return 200;
      case $item`Gathered Meat-Clip`:
        return 520;
      case $item`1,970 carat gold`:
        return 20500;
      case $item`unfinished ice sculpture`:
        return 3 * itemValue($item`snow berries`) + 3 * itemValue($item`ice harvest`);
      case $item`fake hand`:
        return 50000;

      // Mushroom Prices
      case $item`free-range mushroom`:
        return 3 * itemValue($item`mushroom filet`);
      case $item`plump free-range mushroom`:
        return itemValue($item`free-range mushroom`) + 3 * itemValue($item`mushroom filet`);
      case $item`bulky free-range mushroom`:
        return itemValue($item`plump free-range mushroom`) + 3 * itemValue($item`mushroom filet`);
      case $item`giant free-range mushroom`:
        return itemValue($item`bulky free-range mushroom`) + itemValue($item`mushroom slab`);
      case $item`immense free-range mushroom`:
        return itemValue($item`giant free-range mushroom`) + itemValue($item`mushroom slab`);
      case $item`colossal free-range mushroom`:
        return (
          itemValue($item`immense free-range mushroom`) + itemValue($item`house-sized mushroom`)
        );

      // Untradable Currency Prices
      case $item`Freddy Kruegerand`:
        return (
          (0.95 *
            Math.max(
              itemValue($item`bottle of Bloodweiser`),
              itemValue($item`electric Kool-Aid`),
            )) /
          200
        );
      case $item`FunFunds™`:
        return itemValue($item`one-day ticket to Dinseylandfill`) / 20;
      case $item`Beach Buck`:
        return itemValue($item`one-day ticket to Spring Break Beach`) / 100;
      case $item`Volcoino`:
        return itemValue($item`one-day ticket to That 70s Volcano`) / 3;
      case $item`Coinspiracy`:
        return itemValue($item`one-day ticket to Conspiracy Island`) / 100;
      case $item`Wal-Mart gift certificate`:
        return itemValue($item`one-day ticket to The Glaciest`) / 50;

      default:
        if (npcPrice(item) > 0) {
          return npcPrice(item);
        }
        return 0;
    }
  }

  function singularValue(item: Item): number {
    const minValue = specialValue(item);

    if (recentPrice(item) <= Math.max(100, 2 * autosellPrice(item)))
      return Math.max(minValue, autosellPrice(item));

    return Math.max(minValue, recentPrice(item));
  }

  let maxValue = singularValue(item);
  if (getRelated(item, "zap").length > 0) {
    for (const j in getRelated(item, "zap"))
      maxValue = Math.min(maxValue, singularValue(toItem(j)));
  }

  return maxValue;
}

function averageValue(itemList: Item[]): number {
  if (itemList.length === 0) return 0;

  return sum(itemList, (i) => itemValue(i)) / itemList.length;
}

function recentPrice(item: Item): number {
  if (!item.tradeable) return 0;

  if (historicalAge(item) < 7.0) return historicalPrice(item) * 0.9;

  if (mallPrice(item) > 0) return mallPrice(item) * 0.9;

  if (mallPrice(item) < 0 && myHash() !== "") {
    if (isNpcItem(item)) return 0;

    if (historicalAge(item) < 4015) return historicalPrice(item) * 0.9;

    return 1000000000;
  }

  throw `No idea how to price item: ${item}`;
}
