import { set } from "libram";

import { args } from "./lib/args";
import { EVENT_LIST } from "./lib/constants";

export function logEvent(event: string): void {
    let eventList = args.global.eventList.split(',');

    if(eventList.includes(event)) {
        logEvent(event + "1");
        return;
    }

    eventList.push(event);
    args.global.eventList = eventList.toString();
    set(EVENT_LIST, eventList.toString());
}