import { set } from "libram";

import { eventList } from "./constants";
import { args } from "./args";

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
