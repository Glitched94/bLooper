import { get, set } from "libram";

import { args } from "./lib/args";

export function logEvent(event: string): void {
    let eventList = args.global.eventList.split(',');

    if(eventList.includes(event)) {
        logEvent(event + "1");
        return;
    }

    eventList.push(event);
    args.global.eventList = eventList.toString();
}