const gossipSin: SinElement = {
  machineName: 'gossip',
  type: 'against-fellow',
  severity: 'light',
  headerTitle: {
    en: 'Gossip',
    fr: 'Médisance',
  },
  description: {
    en: 'Speaking about others in a negative or harmful way behind their back.',
    fr: 'Parler des autres de manière négative ou nuisible dans leur dos.',
  },
  cardImage: 'PassiveCognition',
  detailBackgroundVideo: 'Candle1',
  confessionTasks: [
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'apologize-gossip',
        overallTask: 'Write a letter of apology to those you have gossiped about.',
        instructionText: {
          en: 'Express genuine remorse and commit to change.',
          fr: 'Exprimez un remords sincère et engagez-vous à changer.',
        },
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silent-reflection-gossip',
        overallTask: 'Practice 30 minutes of silence to reflect on the harm of gossip.',
        testDurationInSeconds: 1800,
        instructionText: {
          en: 'Reflect on the impact of your words on others.',
          fr: 'Réfléchissez à l\'impact de vos paroles sur les autres.',
        },
      },
    },
  ],
  additionalLinks: [],
};

const jealousySin: SinElement = {
  machineName: 'jealousy',
  type: 'against-fellow',
  severity: 'light',
  headerTitle: {
    en: 'Jealousy',
    fr: 'Jalousie',
  },
  description: {
    en: 'Feeling resentful of others\' success, possessions, or advantages.',
    fr: 'Ressentir de la rancune envers le succès, les biens ou les avantages d\'autrui.',
  },
  cardImage: 'PassiveCognition',
  detailBackgroundVideo: 'Candle2',
  confessionTasks: [
    {
      taskType: 'social-tasks',
      payload: {
        key: 'acts-of-kindness-jealousy',
        overallTask: 'Perform acts of kindness for those you have been jealous of.',
        listOfSocialTasks: [
          {
            en: 'Compliment someone you have been jealous of.',
            fr: 'Complimentez quelqu\'un dont vous avez été jaloux.',
          },
          {
            en: 'Help someone achieve their goals.',
            fr: 'Aidez quelqu\'un à atteindre ses objectifs.',
          },
        ],
        instructionText: {
          en: 'Focus on celebrating others\' success rather than resenting it.',
          fr: 'Concentrez-vous sur célébrer le succès des autres plutôt que de le ressentir.',
        },
      },
    },
  ],
  additionalLinks: [],
};

const resentmentSin: SinElement = {
  machineName: 'resentment',
  type: 'against-fellow',
  severity: 'light',
  headerTitle: {
    en: 'Resentment',
    fr: 'Ressentiment',
  },
  description: {
    en: 'Holding onto anger and bitterness towards others for past wrongs.',
    fr: 'Garder de la colère et de l\'amertume envers les autres pour des torts passés.',
  },
  cardImage: 'PassiveCognition',
  detailBackgroundVideo: 'Candle1',
  confessionTasks: [
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'forgive-resentment',
        overallTask: 'Write a letter of forgiveness to someone you resent.',
        instructionText: {
          en: 'Release the burden of resentment through forgiveness.',
          fr: 'Libérez-vous du fardeau du ressentiment par le pardon.',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-forgiveness',
        overallTask: 'Pray for those you resent, asking God to bless them.',
        text: {
          en: 'Lord, help me to forgive [name] and see them through Your eyes of love. Remove the bitterness from my heart and replace it with Your peace.',
          fr: 'Seigneur, aidez-moi à pardonner [nom] et à les voir à travers Vos yeux d\'amour. Enlevez l\'amertume de mon cœur et remplacez-la par Votre paix.',
        },
        instructionText: {
          en: 'Pray this prayer daily for 7 days.',
          fr: 'Priez cette prière quotidiennement pendant 7 jours.',
        },
        reflectionAfterPrayerText: {
          en: 'Reflect on how forgiveness brings freedom to your heart.',
          fr: 'Réfléchissez à la façon dont le pardon apporte la liberté à votre cœur.',
        },
      },
    },
  ],
  additionalLinks: [],
};

export const lightAgainstFellowSins = [
  gossipSin,
  jealousySin,
  resentmentSin,
];

