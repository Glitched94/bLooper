import { Session, set } from "libram";

import { args } from "./args";
import { eventList } from "./constants";

export { logEvent };

function logEvent(event: string): void {
  const events = args.global.eventList.split(",");

  if (events.includes(event)) {
    logEvent(`${event}1`);
    return;
  }

  let session = Session.current(true);
  if (events.length > 0) {
    const lastEvent = events[event.length - 1];
    const lastSession = Session.fromFile(lastEvent);
    session = session.diff(lastSession);
  }
  session.toFile(event);

  if (events[0] === "") {
    events[0] = event;
  } else {
    events.push(event);
  }

  args.global.eventList = events.toString();
  set(eventList.pref.setting, events.toString());
}

// function printAllDiff(): void {
//   const events = args.global.eventList.split(",");

//   const event1 = events[0];
//   const event2 = events[events.length - 1];
//   printEventDiff(event1, event2);
// }

// function printEventDiff(event1: string, event2: string): void {
//   // Get two event. We'll assume event2 is later than event1
//   const event1Session = Session.fromFile(event1);
//   const event2Session = Session.fromFile(event2);

//   // Diff the two events
//   const eventDiff = event2Session.diff(event1Session);
// }
