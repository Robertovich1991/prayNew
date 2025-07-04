const passivityInFaithElement: SinElement = {
  machineName: "passivity-in-faith",
  type: "against-truth",
  severity: "light",

  headerTitle: {
    en: "Passivity in Seeking Truth",
    fr: "Passivité dans la recherche de la Vérité"
  },
  description: {
    en: "Neglecting the study of Scripture and Christian teachings leads to shallow faith. We must seek God's wisdom actively and consciously.",
    fr: "Négliger l'étude des Écritures et de l'enseignement chrétien mène à une foi superficielle. Nous devons rechercher activement et consciemment la sagesse de Dieu."
  },

  cardImage: "Passivity",
  detailBackgroundVideo: "videos/passivity_background.mp4",

  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: "read-scriptures-against-passivity",
        text: {
          en: "Read Proverbs 2:1-6, Hosea 4:6, and 2 Timothy 2:15. Reflect on the importance of seeking God's wisdom.",
          fr: "Lisez Proverbes 2:1-6, Osée 4:6, et 2 Timothée 2:15. Réfléchissez à l'importance de rechercher la sagesse de Dieu."
        },
        surveyQuestions: [
          {
            key: "q1",
            description: {
              en: "What is promised to those who seek God’s wisdom in Proverbs 2?",
              fr: "Que promet Proverbes 2 à ceux qui cherchent la sagesse de Dieu ?"
            },
            answers: [
              {
                text: { en: "Understanding the fear of the Lord", fr: "Comprendre la crainte de l'Éternel" },
                isSolution: true
              },
              {
                text: { en: "Wealth and power", fr: "Richesse et pouvoir" },
                isSolution: false
              }
            ]
          }
        ],
        testDurationInSeconds: 300,
        overallTask: "Read the selected Scriptures and answer the questions honestly.",
        readingDurationRange: "5-10 minutes",
        instructionText: {
          en: "Read carefully. Reflect on your engagement with faith.",
          fr: "Lisez attentivement. Réfléchissez à votre engagement dans la foi."
        }
      }
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: "prayer-against-passivity",
        overallTask: "Pray sincerely for the desire to seek God’s truth daily.",
        text: {
          en: "Lord, awaken in me a hunger for Your truth. Help me not to live by habit alone, but with understanding and conviction.",
          fr: "Seigneur, éveille en moi une faim pour Ta vérité. Aide-moi à ne pas vivre uniquement par habitude, mais avec compréhension et conviction."
        },
        instructionText: {
          en: "Pray this prayer each morning this week.",
          fr: "Récitez cette prière chaque matin cette semaine."
        },
        reflectionAfterPrayerText: {
          en: "What truth about God do you want to explore more deeply?",
          fr: "Quelle vérité sur Dieu souhaitez-vous approfondir ?"
        }
      }
    },
    {
      taskType: 'ritual-participation',
      payload: {
        key: "church-participation-passivity",
        overallTask: "Attend at least 3 church services over the next 10 days.",
        listOfRites: [
          {
            en: "Attend a weekday liturgy and focus on listening to the readings.",
            fr: "Assistez à une liturgie en semaine et concentrez-vous sur les lectures."
          },
          {
            en: "Participate in Sunday mass with full attention and reflection.",
            fr: "Participez pleinement à la messe dominicale avec attention et réflexion."
          },
          {
            en: "Join a special feast celebration such as Easter or Pentecost.",
            fr: "Participez à une célébration spéciale comme Pâques ou la Pentecôte."
          }
        ],
        instructionText: {
          en: "Submit photo/video proof of participation respectfully.",
          fr: "Soumettez des preuves photo/vidéo de votre participation avec respect."
        }
      }
    },
    {
      taskType: 'social-tasks',
      payload: {
        key: "teach-others-about-faith",
        overallTask: "Help others grow in their faith through education or testimony.",
        listOfSocialTasks: [
          {
            en: "Lead a small Bible study or spiritual discussion.",
            fr: "Animez une étude biblique ou une discussion spirituelle."
          },
          {
            en: "Encourage someone to begin reading the Bible daily.",
            fr: "Encouragez quelqu'un à commencer à lire la Bible chaque jour."
          }
        ],
        instructionText: {
          en: "Record your interaction and what you shared.",
          fr: "Notez votre interaction et ce que vous avez partagé."
        }
      }
    },
    {
      taskType: 'ecological-initiatives',
      payload: {
        key: "clean-library-or-study-space",
        overallTask: "Clean or organize a space for spiritual reading/study.",
        listOfRites: [
          {
            en: "Declutter your spiritual reading corner and prepare it for daily use.",
            fr: "Rangez votre coin de lecture spirituelle et préparez-le à un usage quotidien."
          }
        ],
        instructionText: {
          en: "Take a photo of your cleaned and dedicated study space.",
          fr: "Prenez une photo de votre espace d'étude rangé et dédié."
        }
      }
    }
  ],

  additionalLinks: [
    "https://www.bible.com/bible/111/PRO.2.1-6.NIV",
    "https://www.bible.com/bible/111/HOS.4.6.NIV",
    "https://www.bible.com/bible/111/2TI.2.15.NIV"
  ]
};


export const lightAgainstTruthSins = [
 passivityInFaithElement
];