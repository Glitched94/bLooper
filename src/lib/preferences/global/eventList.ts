import { Args } from "grimoire-kolmafia";

import { preference } from "../preference";

export { eventList as pref, eventListPref as arg };

const eventList: preference = {
  setting: "tptb.bLooper.eventList",
  help: "",
};

const eventListPref = Args.string({
  setting: eventList.setting,
  default: "",
  hidden: true,
});
