const idolatrySin: SinElement = {
  machineName: 'idolatry',
  type: 'against-god',
  severity: 'grave',
  headerTitle: {
    en: 'Idolatry',
    fr: 'Idolâtrie',
  },
  description: {
    en: 'Worshiping false gods or images.',
    fr: 'Adorer de faux dieux ou des images.',
  },
  cardImage: 'Superstition',
  detailBackgroundVideo: 'Bubbles',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'read-commandments',
        text: {
          en: 'Read the Ten Commandments.',
          fr: 'Lisez les Dix Commandements.',
        },
        surveyQuestions: [
          {
            key: 'commandments-question',
            description: {
              en: 'What does the first commandment teach?',
              fr: 'Que nous enseigne le premier commandement ?',
            },
            answers: [
              {
                text: { en: 'Love only God', fr: 'Aimer uniquement Dieu' },
                isSolution: true,
              },
              {
                text: { en: 'Honor your parents', fr: 'Honore tes parents' },
                isSolution: false,
              },
            ],
          },
        ],
        testDurationInSeconds: 180,
        overallTask: 'Understand the importance of the commandments.',
        readingDurationRange: '5-10 min',
        instructionText: {
          en: 'Reflect on the commandments as you read.',
          fr: 'Réfléchissez aux commandements en les lisant.',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-against-idolatry',
        overallTask: 'Recite prayers to seek forgiveness for idolatry.',
        text: {
          en: 'Oh Lord, guide us away from false idols.',
          fr: 'Oh Seigneur, éloigne-nous des faux idoles.',
        },
        instructionText: {
          en: 'Say this prayer with sincerity.',
          fr: 'Dites cette prière avec sincérité.',
        },
        reflectionAfterPrayerText: {
          en: 'Reflect on seeking strength to avoid idolatry.',
          fr: "Réfléchissez à la recherche de la force pour éviter l'idolâtrie.",
        },
      },
    },
    {
      taskType: 'religious-rituals',
      payload: {
        key: 'attend-service',
        overallTask: 'Participate in religious services.',
        listOfRites: [
          {
            en: 'Attend a Sunday Service.',
            fr: 'Assister à un service du dimanche.',
          },
          {
            en: 'Join evening prayers.',
            fr: 'Participer aux prières du soir.',
          },
        ],
        instructionText: {
          en: 'Be present and mindful during the service.',
          fr: 'Soyez présent et attentif pendant le service.',
        },
      },
    },
    {
      taskType: 'fasting-and-abstinence',
      payload: {
        key: 'fast-for-purification',
        overallTask: 'Fast to seek spiritual purification.',
        instructionText: {
          en: 'Begin a 24-hour fast with only water.',
          fr: "Commencez un jeûne de 24 heures avec seulement de l'eau.",
        },
      },
    },
  ],
  additionalLinks: [
    'https://example.com/idolatry-prayers',
    'https://example.com/bible-study',
  ],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
    preview:
      'https://i.pinimg.com/736x/c8/cc/24/c8cc24bba37a25c009647b8875aae0e3.jpg',
  },
};

export const graveAgaintGod = [idolatrySin]