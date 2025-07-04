const selfDoubtSin: SinElement = {
  machineName: 'self-doubt',
  type: 'against-yourself',
  severity: 'light',
  headerTitle: {
    en: 'Self-Doubt',
    fr: 'Doute de soi',
  },
  description: {
    en: "Lack of confidence in one's abilities.",
    fr: 'Manque de confiance en ses propres capacités.',
  },
  cardImage: 'Ritualism',
  detailBackgroundVideo: 'Candle2',
  confessionTasks: [
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-for-confidence',
        overallTask: 'Recite prayers to boost self-confidence.',
        text: {
          en: 'Oh Lord, fill me with confidence.',
          fr: 'Oh Seigneur, remplis-moi de confiance.',
        },
        instructionText: {
          en: 'Say this prayer each morning.',
          fr: 'Dites cette prière chaque matin.',
        },
        reflectionAfterPrayerText: {
          en: 'Envision yourself filled with strength.',
          fr: 'Imaginez-vous rempli de force.',
        },
      },
    },
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'verses-on-strength',
        text: {
          en: 'Read Psalms on strength.',
          fr: 'Lisez les Psaumes sur la force.',
        },
        surveyQuestions: [
          {
            key: 'strength-question',
            description: {
              en: 'What is the message of these Psalms?',
              fr: 'Quel est le message de ces Psaumes ?',
            },
            answers: [
              {
                text: {
                  en: 'God is our refuge',
                  fr: 'Dieu est notre refuge',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Beware of enemies',
                  fr: 'Méfiez-vous des ennemis',
                },
                isSolution: false,
              },
            ],
          },
        ],
        testDurationInSeconds: 300,
        overallTask: 'Find strength in scripture.',
        readingDurationRange: '5-7 min',
        instructionText: {
          en: 'Reflect on how these verses apply to you.',
          fr: "Réfléchissez à comment ces versets s'appliquent à vous.",
        },
      },
    },
    {
      taskType: 'social-tasks',
      payload: {
        key: 'community-support',
        overallTask: 'Seek support from your community.',
        listOfSocialTasks: [
          {
            en: 'Attend a community group meeting.',
            fr: 'Assister à une réunion de groupe communautaire.',
          },
          {
            en: 'Share experiences in a support group.',
            fr: 'Partagez vos expériences dans un groupe de soutien.',
          },
        ],
        instructionText: {
          en: 'Engage with others and share.',
          fr: 'Engagez-vous avec les autres et partagez.',
        },
      },
    },
  ],
  additionalLinks: [
    'https://example.com/building-confidence',
    'https://example.com/self-help-resources',
  ],
};


export const lightAgainstYourselfSins = [
 selfDoubtSin
];