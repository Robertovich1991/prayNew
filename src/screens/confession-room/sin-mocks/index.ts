import { graveAgaintGod } from './grave-against-god';
import { againstGodSins } from './light-against-god';
import { lightAgainstTruthSins } from './light-against-truth';
import { lightAgainstYourselfSins } from './light-against-yourself';
import { lightAgainstFellowSins } from './light-against-fellow';
import { mediumAgainstTruthSins } from './medium-against-truth';
import { mediumAgainstGodSins } from './medium-against-god'

export const sinElements = [
  ...againstGodSins,
  ...graveAgaintGod,
  ...lightAgainstYourselfSins,
  ...lightAgainstFellowSins,
  ...mediumAgainstTruthSins,
  ///
  ...lightAgainstTruthSins,
  ...mediumAgainstGodSins
];
