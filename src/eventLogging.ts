import { get, set } from "libram";

import { EVENT_LIST } from "./lib/constants";

export function logEvent(event: string): void {
    let eventList = get(EVENT_LIST, "").split(',');

    if(eventList.includes(event)) {
        logEvent(event + "1");
        return;
    }

    eventList.push(event);
    set(EVENT_LIST, eventList.toString());
}