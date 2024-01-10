import { Args } from "grimoire-kolmafia";

import { preference } from "../preference";

export { getBounties as pref, getBountiesPref as arg };

const getBounties: preference = {
  setting: "tptb.bLooper.getBounties",
  help: "If true, will run 'bountiful' after 'garbo nobarf' at the start of each leg. Currently dependencies aren't installed automatically, so ensure you have \"Bountiful\" installed before setting this to true.",
};

const getBountiesPref = Args.boolean({
  setting: getBounties.setting,
  help: getBounties.help,
  default: false,
});
