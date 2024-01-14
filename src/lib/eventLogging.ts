import { print, printHtml, todayToString } from "kolmafia";
import { get, set } from "libram";
import { Snapshot } from "snapshot-libram";

import { args } from "./args";
import { eventList } from "./constants";

export { checkLogForEvent, logEvent, printAllDiff };

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

function checkLogForEvent(event: string): boolean {
  checkDate();

  const events = args.global.eventList.split(",");
  return events.includes(event);
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

  print("");
  printHtml(`<font color=0000ff><b>Now comparing all events from ${lastRun}...</b></font>`);
  printEventDiff(event1, event2);
}

function printEventDiff(event1: string, event2: string): void {
  // Get two events. We'll assume event2 is later than event1
  const event1Snapshot = Snapshot.fromFile(event1);
  const event2Snapshot = Snapshot.fromFile(event2);

  event2Snapshot.printDiff(event1Snapshot);
}
