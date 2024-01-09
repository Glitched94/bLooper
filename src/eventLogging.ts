import { set } from "libram";

import { args } from "./lib/args";
import { eventList } from "./lib/constants";

export function logEvent(event: string): void {
  const events = args.global.eventList.split(",");

  if (events.includes(event)) {
    logEvent(`${event}1`);
    return;
  }

  events.push(event);
  args.global.eventList = events.toString();
  set(eventList.pref.setting, events.toString());
}
