import { set } from "libram";

import { args } from "./args";
import { eventList } from "./constants";

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
