const envySin: SinElement = {
  machineName: 'envy',
  type: 'against-fellow',
  severity: 'medium',
  headerTitle: {
    en: 'Envy',
    fr: 'Envie',
  },
  description: {
    en: "Desire for others' traits or possessions.",
    fr: "Désir des traits ou possessions d'autrui.",
  },
  cardImage: 'PassiveCognition',
  detailBackgroundVideo: 'Candle1',
  confessionTasks: [
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'write-apology',
        overallTask: 'Write a letter to seek forgiveness for envious behavior.',
        instructionText: {
          en: 'Express genuine remorse.',
          fr: 'Exprimez un remords sincère.',
        },
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silent-retreat',
        overallTask: 'Engage in a silent retreat to reflect on envy.',
        testDurationInSeconds: 7200,
        instructionText: {
          en: 'Maintain silence and meditate.',
          fr: 'Gardez le silence et méditez.',
        },
      },
    },
    {
      taskType: 'social-tasks',
      payload: {
        key: 'acts-of-kindness',
        overallTask: 'Perform acts of kindness to counteract envy.',
        listOfSocialTasks: [
          {
            en: 'Help a neighbor with chores.',
            fr: 'Aide un voisin avec des tâches ménagères.',
          },
          {
            en: 'Volunteer at a local shelter.',
            fr: 'Faites du bénévolat dans un refuge local.',
          },
        ],
        instructionText: {
          en: 'Engage with a spirit of giving.',
          fr: 'Engagez-vous avec un esprit de don.',
        },
      },
    },
  ],
  additionalLinks: [
    'https://example.com/conquering-envy',
    'https://example.com/reflection-guides',
  ],
};


export const mediumAgainstTruthSins = [
 envySin
];