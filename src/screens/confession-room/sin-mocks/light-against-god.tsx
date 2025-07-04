const superstitionSin: SinElement = {
  machineName: 'superstition',
  type: 'against-god',
  severity: 'light',
  headerTitle: {
    en: 'Superstition',
    fr: 'Superstition',
  },
  description: {
    en: 'Superstition (magic, divination, omens, fortune-telling). These are pagan remnants that undermine true Christian faith.',
    fr: 'La superstition (magie, divination, présages, voyance). Ce sont des vestiges païens qui sapent la véritable foi chrétienne.',
  },
  cardImage: 'Superstition',
  detailBackgroundVideo: 'Columns1',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'bible-superstition',
        text: {
          en: 'Read the following passages carefully and reflect...',
          fr: 'Lisez attentivement les passages suivants et réfléchissez...',
        },
        instructionText: {
          en: 'Carefully read the Bible passage and reflect...',
          fr: 'Lisez attentivement le passage biblique et méditez...',
        },
        readingDurationRange: '5–10 min per passage',
        testDurationInSeconds: 600,
        overallTask: '5-10 Min',
        surveyQuestions: [
          {
            key: 'q1',
            description: {
              en: 'According to Deuteronomy 18:10–12, what is considered detestable to the Lord?',
              fr: 'Selon Deutéronome 18:10–12, qu’est-ce que Dieu considère comme une abomination ?',
            },
            answers: [
              {
                text: {
                  en: 'Laziness and gluttony',
                  fr: 'La paresse et la gourmandise',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Doubting faith',
                  fr: 'Le doute dans la foi',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Witchcraft, divination, and consulting the dead',
                  fr: 'La divination, la sorcellerie, interroger les morts',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Selling idols',
                  fr: 'Vendre des idoles',
                },
                isSolution: false,
              },
            ],
          },
        ],
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silence-superstition',
        overallTask: '5-10 Min',
        testDurationInSeconds: 900,
        instructionText: {
          en: 'Find a quiet space. Stay silent for 15 minutes...',
          fr: 'Trouvez un endroit calme. Restez en silence pendant 15 minutes...',
        },
      },
    },
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'letter-superstition',
        overallTask: '5-10 Min',
        instructionText: {
          en: 'In the text box provided, write a personal letter...',
          fr: 'Dans le champ de texte prévu, écrivez une lettre personnelle...',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-superstition',
        overallTask: '5-10 Min',
        text: {
          en: 'Lord, I renounce all false beliefs and ask You to fill my heart with Your truth...',
          fr: 'Seigneur, je renonce à toutes croyances fausses et Te demande de remplir mon cœur de Ta vérité...',
        },
        instructionText: {
          en: 'Recite this prayer slowly and meaningfully...',
          fr: 'Récitez cette prière lentement et avec intention...',
        },
        reflectionAfterPrayerText: {
          en: 'How do you feel after reciting the prayer? Write down your thoughts.',
          fr: 'Comment vous sentez-vous après avoir récité la prière ? Écrivez vos pensées.',
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
      taskType: 'social-tasks',
      payload: {
        key: 'acts-of-kindness',
        overallTask: '3-10 Days',
        listOfSocialTasks: [
          {
            en: 'Participation in special church events (Christmas, Easter and other religious holidays)',
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
  additionalLinks: [],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
  },
};

const ritualismSin: SinElement = {
  machineName: 'ritualism',
  type: 'against-god',
  severity: 'light',
  headerTitle: {
    en: 'Ritualism',
    fr: 'Ritualism',
  },
  description: {
    en: 'Superstition (magic, divination, omens, fortune-telling). These are pagan remnants that undermine true Christian faith.',
    fr: 'La superstition (magie, divination, présages, voyance). Ce sont des vestiges païens qui sapent la véritable foi chrétienne.',
  },
  cardImage: 'Ritualism',
  detailBackgroundVideo: 'Face',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'bible-superstition',
        text: {
          en: 'Read the following passages carefully and reflect...',
          fr: 'Lisez attentivement les passages suivants et réfléchissez...',
        },
        instructionText: {
          en: 'Carefully read the Bible passage and reflect...',
          fr: 'Lisez attentivement le passage biblique et méditez...',
        },
        readingDurationRange: '5–10 min per passage',
        testDurationInSeconds: 600,
        overallTask: '5-10 Min',
        surveyQuestions: [
          {
            key: 'q1',
            description: {
              en: 'According to Deuteronomy 18:10–12, what is considered detestable to the Lord?',
              fr: 'Selon Deutéronome 18:10–12, qu’est-ce que Dieu considère comme une abomination ?',
            },
            answers: [
              {
                text: {
                  en: 'Laziness and gluttony',
                  fr: 'La paresse et la gourmandise',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Doubting faith',
                  fr: 'Le doute dans la foi',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Witchcraft, divination, and consulting the dead',
                  fr: 'La divination, la sorcellerie, interroger les morts',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Selling idols',
                  fr: 'Vendre des idoles',
                },
                isSolution: false,
              },
            ],
          },
        ],
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silence-superstition',
        overallTask: '5-10 Min',
        testDurationInSeconds: 900,
        instructionText: {
          en: 'Find a quiet space. Stay silent for 15 minutes...',
          fr: 'Trouvez un endroit calme. Restez en silence pendant 15 minutes...',
        },
      },
    },
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'letter-superstition',
        overallTask: '5-10 Min',
        instructionText: {
          en: 'In the text box provided, write a personal letter...',
          fr: 'Dans le champ de texte prévu, écrivez une lettre personnelle...',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-superstition',
        overallTask: '5-10 Min',
        text: {
          en: 'Lord, I renounce all false beliefs and ask You to fill my heart with Your truth...',
          fr: 'Seigneur, je renonce à toutes croyances fausses et Te demande de remplir mon cœur de Ta vérité...',
        },
        instructionText: {
          en: 'Recite this prayer slowly and meaningfully...',
          fr: 'Récitez cette prière lentement et avec intention...',
        },
        reflectionAfterPrayerText: {
          en: 'How do you feel after reciting the prayer? Write down your thoughts.',
          fr: 'Comment vous sentez-vous après avoir récité la prière ? Écrivez vos pensées.',
        },
      },
    },
  ],
  additionalLinks: [],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
  },
};

const absenceOfReference: SinElement = {

  machineName: "absence-of-reverence",
  type: "against-god",
  severity: "light",
  headerTitle: {
    en: "Absence of Reverence During Worship",
    fr: "Absence de Révérence pendant le Culte"
  },
  description: {
    en: "Distracted prayer, irreverent behavior in church, and lack of spiritual sensitivity during worship are signs of a disconnected heart. We are called to recognize God's holy presence in His house.",
    fr: "La prière distraite, le comportement irrévérencieux à l’église, et le manque de sensibilité spirituelle pendant le culte révèlent un cœur détaché. Nous sommes appelés à reconnaître la présence sacrée de Dieu dans Sa maison."
  },
  cardImage: "Reverence",
  detailBackgroundVideo: "videos/reverence_background.mp4",
  confessionTasks: [
    {
      taskType: "reading-the-bible",
      payload: {
        key: "reverence-bible-readings",
        text: {
          en: "Read Ecclesiastes 5:1–2, Hebrews 12:28–29, and Psalm 95:6–7. Reflect on how these passages call us to worship with awe and reverence.",
          fr: "Lisez Ecclésiaste 5:1–2, Hébreux 12:28–29 et Psaume 95:6–7. Réfléchissez à la manière dont ces passages nous appellent à adorer avec crainte et révérence."
        },
        instructionText: {
          en: "Find a quiet place. Read slowly and prayerfully. Then answer the questions below.",
          fr: "Trouvez un endroit calme. Lisez lentement et dans un esprit de prière. Puis répondez aux questions ci-dessous."
        },
        readingDurationRange: "5–10 min per passage",
        testDurationInSeconds: 600,
        overallTask: "Read all selected Bible passages and complete the quiz.",
        surveyQuestions: [
          {
            key: "q1",
            description: {
              en: "According to Ecclesiastes, how should we approach the house of God?",
              fr: "Selon l’Ecclésiaste, comment devons-nous nous approcher de la maison de Dieu ?"
            },
            answers: [
              {
                text: {
                  fr: "Avec révérence et un cœur à l’écoute",
                  en: "With reverence and a listening heart",
                },
                isSolution: true
              },
              {
                text: {
                  en: "With loud songs and applause",
                  fr: "Avec des chants bruyants et des applaudissements"
                },
                isSolution: false
              }
            ]
          },
          {
            key: "q2",
            description: {
              en: "What does Hebrews 12:28–29 say about worship?",
              fr: "Que dit Hébreux 12:28–29 sur l’adoration ?"
            },
            answers: [
              {
                text: {
                  en: "We must worship with reverence and awe",
                  fr: "Nous devons adorer avec révérence et crainte"
                },
                isSolution: true
              },
              {
                text: {
                  en: "We should dance and shout in church",
                  fr: "Nous devrions danser et crier dans l’église"
                },
                isSolution: false
              }
            ]
          },
          {
            key: "q3",
            description: {
              en: "Why should we be silent in God’s house?",
              fr: "Pourquoi devons-nous être silencieux dans la maison de Dieu ?"
            },
            answers: [
              {
                text: {
                  en: "To listen and not offer the sacrifice of fools",
                  fr: "Pour écouter et ne pas offrir le sacrifice des insensés"
                },
                isSolution: true
              },
              {
                text: {
                  en: "To avoid disturbing others",
                  fr: "Pour ne pas déranger les autres"
                },
                isSolution: false
              }
            ]
          },
          {
            key: "q4",
            description: {
              en: "Psalm 95 encourages us to do what?",
              fr: "Le Psaume 95 nous encourage à faire quoi ?"
            },
            answers: [
              {
                text: {
                  en: "Bow down and kneel before the Lord",
                  fr: "Se prosterner et s’agenouiller devant le Seigneur"
                },
                isSolution: true
              },
              {
                text: {
                  en: "Celebrate worldly achievements",
                  fr: "Célébrer les réussites mondaines"
                },
                isSolutio: false
              }
            ]
          },
          {
            key: "q5",
            description: {
              en: "What attitude should we have in church?",
              fr: "Quelle attitude devons-nous avoir à l’église ?"
            },
            answers: [
              {
                text: {
                  en: "Reverence and humility",
                  fr: "Révérence et humilité"
                },
                isSolution: true
              },
              {
                text: {
                  en: "Casual and indifferent",
                  fr: "Désinvolte et indifférent"
                },
                isSolution: false
              }
            ]
          }
        ]
      }
    },
    {
      taskType: "prayer-recitation",
      payload: {
        key: "reverence-prayer",
        overallTask: "Pray for a heart of reverence and attentiveness during worship.",
        text: {
          en: "Lord, open my heart to feel Your presence in the sanctuary. Teach me to honor You with my whole being.",
          fr: "Seigneur, ouvre mon cœur pour ressentir Ta présence dans le sanctuaire. Apprends-moi à T’honorer de tout mon être."
        },
        instructionText: {
          en: "Recite this prayer slowly and reflectively.",
          fr: "Récitez cette prière lentement et avec recueillement."
        },
        reflectionAfterPrayerText: {
          en: "How can you better prepare yourself before entering worship?",
          fr: "Comment pouvez-vous mieux vous préparer avant d’entrer dans le culte ?"
        },
        candle: {
          enabled: true,
          burnTime: 300
        }
      }
    },
    {
      taskType: "practice-of-silence",
      payload: {
        key: "reverence-silence",
        overallTask: "Spend 10 minutes in silent adoration before God, focusing on His holiness.",
        testDurationInSeconds: 600,
        instructionText: {
          en: "Enter into silence, letting go of distractions. Just be in God’s presence.",
          fr: "Entrez dans le silence, en laissant de côté les distractions. Soyez simplement en présence de Dieu."
        }
      }
    },
    {
      taskType: "letters-of-forgiveness",
      payload: {
        key: "reverence-letter",
        overallTask: "Write a heartfelt letter to God expressing repentance for your lack of reverence.",
        instructionText: {
          en: "Use the space to write sincerely to God, acknowledging your distraction and asking for grace.",
          fr: "Utilisez cet espace pour écrire sincèrement à Dieu, reconnaissant votre distraction et demandant la grâce."
        }
      }
    },
    {
      taskType: "religious-rituals",
      payload: {
        key: "reverence-rituals",
        overallTask: "Participate in at least 3 religious services over the next 10 days.",
        instructionText: {
          en: "Attend church services with reverence. Record your participation and submit a photo or note.",
          fr: "Participez aux offices religieux avec révérence. Enregistrez votre participation et soumettez une photo ou une note."
        }
      }
    },
    {
      taskType: "social-tasks",
      payload: {
        key: "reverence-social-actions",
        overallTask: "Perform at least one act of service that expresses reverence and humility.",
        instructionText: {
          en: "Choose a task such as helping the elderly or volunteering in church, and complete it with care.",
          fr: "Choisissez une tâche comme aider les personnes âgées ou faire du bénévolat à l’église, et accomplissez-la avec soin."
        }
      }
    },
    {
      taskType: "religious-rituals",
      payload: {
        key: "reverence-rituals",
        overallTask: "Participate in religious rituals that cultivate reverence and presence before God.",
        listOfRites: [
          {
            en: "Attend a full church service without distraction.",
            fr: "Assister à une messe entière sans distraction."
          },
          {
            en: "Participate in communal prayer with full attention.",
            fr: "Participer à une prière communautaire avec une pleine attention."
          },
          {
            en: "Be present at a special liturgical feast (e.g., Easter, Christmas).",
            fr: "Être présent à une fête liturgique spéciale (Pâques, Noël, etc.)."
          }
        ],
        instructionText: {
          en: "Chooe one or more rituals to complete. Be fully engaged and reverent during each.",
          fr: "Choisissez un ou plusieurs rituels à accomplir. Soyez pleinement engagé et respectueux pendant chacun."
        }
      }
    },
    {
      taskType: "social-tasks",
      payload: {
        key: "reverence-social",
        overallTask: "Perform acts of kindness that reflect reverence for God and others.",
        listOfSocialTasks: [
          {
            en: "Clean and prepare the church before or after a service.",
            fr: "Nettoyez et préparez l’église avant ou après un service."
          },
          {
            en: "Help someone attend worship who would otherwise miss it.",
            fr: "Aidez quelqu’un à assister au culte s’il ne peut pas venir seul."
          },
          {
            en: "Speak respectfully to or about clergy and spiritual elders.",
            fr: "Parlez respectueusement aux membres du clergé ou à leur sujet."
          }
        ],
        instructionTet: {
          en: "Choose a task that demonstrates reverence in action. Complete it with sincerity.",
          fr: "Choisissez une tâche qui démontre votre révérence par l’action. Accomplissez-la avec sincérité."
        }
      }
    }
  ],
  additionalLinks: [
    "https://www.bible.com/bible/111/ECC.5.1-2.NIV",
    "https://www.bible.com/bible/111/HEB.12.28-29.NIV",
    "https://www.bible.com/bible/111/PSA.95.6-7.NIV"
  ],
  forgivenessMessage: {
    en: "Your sins are forgiven. May you walk in humility and grace.\n\"Blessed are those who honor the Lord in worship.\"",
    f: "Vos péchés sont pardonnés. Marchez dans l’humilité et la grâce.\n« Heureux ceux qui honorent le Seigneur dans le culte. »"
  },
  instructionPopupText: {
    en: "This task helps you restore reverence and attentiveness during worship. Follow each step prayerfully.",
    fr: "Cette tâche vous aide à restaurer la révérence et l’attention pendant le culte. Suivez chaque étape dans un esprit de prière."
  },
  support: {
    en: "You may contact an online pastor for spiritual help.",
    fr: "Vous pouvez contacter un pasteur en ligne pour obtenir une aide spirituelle."
  }

}

const passiveCognitionSin: SinElement = {
  machineName: 'passiveCognitionSin',
  type: 'against-god',
  severity: 'light',
  headerTitle: {
    en: 'Passive cognition',
    fr: 'Passive cognition',
  },
  description: {
    en: 'Superstition (magic, divination, omens, fortune-telling). These are pagan remnants that undermine true Christian faith.',
    fr: 'La superstition (magie, divination, présages, voyance). Ce sont des vestiges païens qui sapent la véritable foi chrétienne.',
  },
  cardImage: 'PassiveCognition',
  detailBackgroundVideo: 'Geometry',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'bible-superstition',
        text: {
          en: 'Read the following passages carefully and reflect...',
          fr: 'Lisez attentivement les passages suivants et réfléchissez...',
        },
        instructionText: {
          en: 'Carefully read the Bible passage and reflect...',
          fr: 'Lisez attentivement le passage biblique et méditez...',
        },
        readingDurationRange: '5–10 min per passage',
        testDurationInSeconds: 600,
        overallTask: '5-10 Min',
        surveyQuestions: [
          {
            key: 'q1',
            description: {
              en: 'According to Deuteronomy 18:10–12, what is considered detestable to the Lord?',
              fr: 'Selon Deutéronome 18:10–12, qu’est-ce que Dieu considère comme une abomination ?',
            },
            answers: [
              {
                text: {
                  en: 'Laziness and gluttony',
                  fr: 'La paresse et la gourmandise',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Doubting faith',
                  fr: 'Le doute dans la foi',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Witchcraft, divination, and consulting the dead',
                  fr: 'La divination, la sorcellerie, interroger les morts',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Selling idols',
                  fr: 'Vendre des idoles',
                },
                isSolution: false,
              },
            ],
          },
        ],
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silence-superstition',
        overallTask: '5-10 Min',
        testDurationInSeconds: 900,
        instructionText: {
          en: 'Find a quiet space. Stay silent for 15 minutes...',
          fr: 'Trouvez un endroit calme. Restez en silence pendant 15 minutes...',
        },
      },
    },
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'letter-superstition',
        overallTask: '5-10 Min',
        instructionText: {
          en: 'In the text box provided, write a personal letter...',
          fr: 'Dans le champ de texte prévu, écrivez une lettre personnelle...',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-superstition',
        overallTask: '5-10 Min',
        text: {
          en: 'Lord, I renounce all false beliefs and ask You to fill my heart with Your truth...',
          fr: 'Seigneur, je renonce à toutes croyances fausses et Te demande de remplir mon cœur de Ta vérité...',
        },
        instructionText: {
          en: 'Recite this prayer slowly and meaningfully...',
          fr: 'Récitez cette prière lentement et avec intention...',
        },
        reflectionAfterPrayerText: {
          en: 'How do you feel after reciting the prayer? Write down your thoughts.',
          fr: 'Comment vous sentez-vous après avoir récité la prière ? Écrivez vos pensées.',
        },
      },
    },
  ],
  additionalLinks: [],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
  },
};

const notFeelingThePresenceOfGodSin: SinElement = {
  machineName: 'not-feeling-the-presence-of-god',
  type: 'against-god',
  severity: 'light',
  headerTitle: {
    en: 'Not feeling the presence of God',
    fr: 'Not feeling the presence of God',
  },
  description: {
    en: 'Superstition (magic, divination, omens, fortune-telling). These are pagan remnants that undermine true Christian faith.',
    fr: 'La superstition (magie, divination, présages, voyance). Ce sont des vestiges païens qui sapent la véritable foi chrétienne.',
  },
  cardImage: 'NotFeelingGod',
  detailBackgroundVideo: 'Mozaika1',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'bible-superstition',
        text: {
          en: 'Read the following passages carefully and reflect...',
          fr: 'Lisez attentivement les passages suivants et réfléchissez...',
        },
        instructionText: {
          en: 'Carefully read the Bible passage and reflect...',
          fr: 'Lisez attentivement le passage biblique et méditez...',
        },
        readingDurationRange: '5–10 min per passage',
        testDurationInSeconds: 600,
        overallTask: '5-10 Min',
        surveyQuestions: [
          {
            key: 'q1',
            description: {
              en: 'According to Deuteronomy 18:10–12, what is considered detestable to the Lord?',
              fr: 'Selon Deutéronome 18:10–12, qu’est-ce que Dieu considère comme une abomination ?',
            },
            answers: [
              {
                text: {
                  en: 'Laziness and gluttony',
                  fr: 'La paresse et la gourmandise',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Doubting faith',
                  fr: 'Le doute dans la foi',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Witchcraft, divination, and consulting the dead',
                  fr: 'La divination, la sorcellerie, interroger les morts',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Selling idols',
                  fr: 'Vendre des idoles',
                },
                isSolution: false,
              },
            ],
          },
        ],
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silence-superstition',
        overallTask: '5-10 Min',
        testDurationInSeconds: 900,
        instructionText: {
          en: 'Find a quiet space. Stay silent for 15 minutes...',
          fr: 'Trouvez un endroit calme. Restez en silence pendant 15 minutes...',
        },
      },
    },
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'letter-superstition',
        overallTask: '5-10 Min',
        instructionText: {
          en: 'In the text box provided, write a personal letter...',
          fr: 'Dans le champ de texte prévu, écrivez une lettre personnelle...',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-superstition',
        overallTask: '5-10 Min',
        text: {
          en: 'Lord, I renounce all false beliefs and ask You to fill my heart with Your truth...',
          fr: 'Seigneur, je renonce à toutes croyances fausses et Te demande de remplir mon cœur de Ta vérité...',
        },
        instructionText: {
          en: 'Recite this prayer slowly and meaningfully...',
          fr: 'Récitez cette prière lentement et avec intention...',
        },
        reflectionAfterPrayerText: {
          en: 'How do you feel after reciting the prayer? Write down your thoughts.',
          fr: 'Comment vous sentez-vous après avoir récité la prière ? Écrivez vos pensées.',
        },
      },
    },
  ],
  additionalLinks: [],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
  },
};

const сonsumerismTowardGodAndTheChurchSin: SinElement = {
  machineName: 'сonsumerismTowardGodAndTheChurchSin',
  type: 'against-god',
  severity: 'light',
  headerTitle: {
    en: 'Consumerism toward God and the Church',
    fr: 'Consumerism toward God and the Church',
  },
  description: {
    en: 'Superstition (magic, divination, omens, fortune-telling). These are pagan remnants that undermine true Christian faith.',
    fr: 'La superstition (magie, divination, présages, voyance). Ce sont des vestiges païens qui sapent la véritable foi chrétienne.',
  },
  cardImage: 'ConsumerismTowardGodAndTheChurch',
  detailBackgroundVideo: 'Sparkles',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'bible-superstition',
        text: {
          en: 'Read the following passages carefully and reflect...',
          fr: 'Lisez attentivement les passages suivants et réfléchissez...',
        },
        instructionText: {
          en: 'Carefully read the Bible passage and reflect...',
          fr: 'Lisez attentivement le passage biblique et méditez...',
        },
        readingDurationRange: '5–10 min per passage',
        testDurationInSeconds: 600,
        overallTask: '5-10 Min',
        surveyQuestions: [
          {
            key: 'q1',
            description: {
              en: 'According to Deuteronomy 18:10–12, what is considered detestable to the Lord?',
              fr: 'Selon Deutéronome 18:10–12, qu’est-ce que Dieu considère comme une abomination ?',
            },
            answers: [
              {
                text: {
                  en: 'Laziness and gluttony',
                  fr: 'La paresse et la gourmandise',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Doubting faith',
                  fr: 'Le doute dans la foi',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Witchcraft, divination, and consulting the dead',
                  fr: 'La divination, la sorcellerie, interroger les morts',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Selling idols',
                  fr: 'Vendre des idoles',
                },
                isSolution: false,
              },
            ],
          },
        ],
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silence-superstition',
        overallTask: '5-10 Min',
        testDurationInSeconds: 900,
        instructionText: {
          en: 'Find a quiet space. Stay silent for 15 minutes...',
          fr: 'Trouvez un endroit calme. Restez en silence pendant 15 minutes...',
        },
      },
    },
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'letter-superstition',
        overallTask: '5-10 Min',
        instructionText: {
          en: 'In the text box provided, write a personal letter...',
          fr: 'Dans le champ de texte prévu, écrivez une lettre personnelle...',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-superstition',
        overallTask: '5-10 Min',
        text: {
          en: 'Lord, I renounce all false beliefs and ask You to fill my heart with Your truth...',
          fr: 'Seigneur, je renonce à toutes croyances fausses et Te demande de remplir mon cœur de Ta vérité...',
        },
        instructionText: {
          en: 'Recite this prayer slowly and meaningfully...',
          fr: 'Récitez cette prière lentement et avec intention...',
        },
        reflectionAfterPrayerText: {
          en: 'How do you feel after reciting the prayer? Write down your thoughts.',
          fr: 'Comment vous sentez-vous après avoir récité la prière ? Écrivez vos pensées.',
        },
      },
    },
  ],
  additionalLinks: [],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
  },
};

const nonComplianceWithTheRule: SinElement = {
  machineName: 'Non-compliance with the Rule',
  type: 'against-god',
  severity: 'light',
  headerTitle: {
    en: 'Non-compliance with the Rule',
    fr: 'Non-compliance with the Rule',
  },
  description: {
    en: 'Superstition (magic, divination, omens, fortune-telling). These are pagan remnants that undermine true Christian faith.',
    fr: 'La superstition (magie, divination, présages, voyance). Ce sont des vestiges païens qui sapent la véritable foi chrétienne.',
  },
  cardImage: 'NonComplianceWithTheRule',
  detailBackgroundVideo: 'Bubbles',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'bible-superstition',
        text: {
          en: 'Read the following passages carefully and reflect...',
          fr: 'Lisez attentivement les passages suivants et réfléchissez...',
        },
        instructionText: {
          en: 'Carefully read the Bible passage and reflect...',
          fr: 'Lisez attentivement le passage biblique et méditez...',
        },
        readingDurationRange: '5–10 min per passage',
        testDurationInSeconds: 600,
        overallTask: '5-10 Min',
        surveyQuestions: [
          {
            key: 'q1',
            description: {
              en: 'According to Deuteronomy 18:10–12, what is considered detestable to the Lord?',
              fr: 'Selon Deutéronome 18:10–12, qu’est-ce que Dieu considère comme une abomination ?',
            },
            answers: [
              {
                text: {
                  en: 'Laziness and gluttony',
                  fr: 'La paresse et la gourmandise',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Doubting faith',
                  fr: 'Le doute dans la foi',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Witchcraft, divination, and consulting the dead',
                  fr: 'La divination, la sorcellerie, interroger les morts',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Selling idols',
                  fr: 'Vendre des idoles',
                },
                isSolution: false,
              },
            ],
          },
        ],
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silence-superstition',
        overallTask: '5-10 Min',
        testDurationInSeconds: 900,
        instructionText: {
          en: 'Find a quiet space. Stay silent for 15 minutes...',
          fr: 'Trouvez un endroit calme. Restez en silence pendant 15 minutes...',
        },
      },
    },
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'letter-superstition',
        overallTask: '5-10 Min',
        instructionText: {
          en: 'In the text box provided, write a personal letter...',
          fr: 'Dans le champ de texte prévu, écrivez une lettre personnelle...',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-superstition',
        overallTask: '5-10 Min',
        text: {
          en: 'Lord, I renounce all false beliefs and ask You to fill my heart with Your truth...',
          fr: 'Seigneur, je renonce à toutes croyances fausses et Te demande de remplir mon cœur de Ta vérité...',
        },
        instructionText: {
          en: 'Recite this prayer slowly and meaningfully...',
          fr: 'Récitez cette prière lentement et avec intention...',
        },
        reflectionAfterPrayerText: {
          en: 'How do you feel after reciting the prayer? Write down your thoughts.',
          fr: 'Comment vous sentez-vous après avoir récité la prière ? Écrivez vos pensées.',
        },
      },
    },
  ],
  additionalLinks: [],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
  },
};

const passiveCognition2Sin: SinElement = {
  machineName: 'passiveCognition2Sin',
  type: 'against-god',
  severity: 'light',
  headerTitle: {
    en: 'Passive cognition 2',
    fr: 'Passive cognition 2',
  },
  description: {
    en: 'Superstition (magic, divination, omens, fortune-telling). These are pagan remnants that undermine true Christian faith.',
    fr: 'La superstition (magie, divination, présages, voyance). Ce sont des vestiges païens qui sapent la véritable foi chrétienne.',
  },
  cardImage: 'PassiveCognition',
  detailBackgroundVideo: 'Candle1',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'bible-superstition',
        text: {
          en: 'Read the following passages carefully and reflect...',
          fr: 'Lisez attentivement les passages suivants et réfléchissez...',
        },
        instructionText: {
          en: 'Carefully read the Bible passage and reflect...',
          fr: 'Lisez attentivement le passage biblique et méditez...',
        },
        readingDurationRange: '5–10 min per passage',
        testDurationInSeconds: 600,
        overallTask: '5-10 Min',
        surveyQuestions: [
          {
            key: 'q1',
            description: {
              en: 'According to Deuteronomy 18:10–12, what is considered detestable to the Lord?',
              fr: 'Selon Deutéronome 18:10–12, qu’est-ce que Dieu considère comme une abomination ?',
            },
            answers: [
              {
                text: {
                  en: 'Laziness and gluttony',
                  fr: 'La paresse et la gourmandise',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Doubting faith',
                  fr: 'Le doute dans la foi',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Witchcraft, divination, and consulting the dead',
                  fr: 'La divination, la sorcellerie, interroger les morts',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Selling idols',
                  fr: 'Vendre des idoles',
                },
                isSolution: false,
              },
            ],
          },
        ],
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silence-superstition',
        overallTask: '5-10 Min',
        testDurationInSeconds: 900,
        instructionText: {
          en: 'Find a quiet space. Stay silent for 15 minutes...',
          fr: 'Trouvez un endroit calme. Restez en silence pendant 15 minutes...',
        },
      },
    },
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'letter-superstition',
        overallTask: '5-10 Min',
        instructionText: {
          en: 'In the text box provided, write a personal letter...',
          fr: 'Dans le champ de texte prévu, écrivez une lettre personnelle...',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-superstition',
        overallTask: '5-10 Min',
        text: {
          en: 'Lord, I renounce all false beliefs and ask You to fill my heart with Your truth...',
          fr: 'Seigneur, je renonce à toutes croyances fausses et Te demande de remplir mon cœur de Ta vérité...',
        },
        instructionText: {
          en: 'Recite this prayer slowly and meaningfully...',
          fr: 'Récitez cette prière lentement et avec intention...',
        },
        reflectionAfterPrayerText: {
          en: 'How do you feel after reciting the prayer? Write down your thoughts.',
          fr: 'Comment vous sentez-vous après avoir récité la prière ? Écrivez vos pensées.',
        },
      },
    },
  ],
  additionalLinks: [],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
  },
};

const passiveCognition3Sin: SinElement = {
  machineName: 'passiveCognition3Sin',
  type: 'against-god',
  severity: 'light',
  headerTitle: {
    en: 'Passive cognition 3',
    fr: 'Passive cognition 3',
  },
  description: {
    en: 'Superstition (magic, divination, omens, fortune-telling). These are pagan remnants that undermine true Christian faith.',
    fr: 'La superstition (magie, divination, présages, voyance). Ce sont des vestiges païens qui sapent la véritable foi chrétienne.',
  },
  cardImage: 'PassiveCognition',
  detailBackgroundVideo: 'Face',
  confessionTasks: [
    {
      taskType: 'reading-the-bible',
      payload: {
        key: 'bible-superstition',
        text: {
          en: 'Read the following passages carefully and reflect...',
          fr: 'Lisez attentivement les passages suivants et réfléchissez...',
        },
        instructionText: {
          en: 'Carefully read the Bible passage and reflect...',
          fr: 'Lisez attentivement le passage biblique et méditez...',
        },
        readingDurationRange: '5–10 min per passage',
        testDurationInSeconds: 600,
        overallTask: '5-10 Min',
        surveyQuestions: [
          {
            key: 'q1',
            description: {
              en: 'According to Deuteronomy 18:10–12, what is considered detestable to the Lord?',
              fr: 'Selon Deutéronome 18:10–12, qu’est-ce que Dieu considère comme une abomination ?',
            },
            answers: [
              {
                text: {
                  en: 'Laziness and gluttony',
                  fr: 'La paresse et la gourmandise',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Doubting faith',
                  fr: 'Le doute dans la foi',
                },
                isSolution: false,
              },
              {
                text: {
                  en: 'Witchcraft, divination, and consulting the dead',
                  fr: 'La divination, la sorcellerie, interroger les morts',
                },
                isSolution: true,
              },
              {
                text: {
                  en: 'Selling idols',
                  fr: 'Vendre des idoles',
                },
                isSolution: false,
              },
            ],
          },
        ],
      },
    },
    {
      taskType: 'practice-of-silence',
      payload: {
        key: 'silence-superstition',
        overallTask: '5-10 Min',
        testDurationInSeconds: 900,
        instructionText: {
          en: 'Find a quiet space. Stay silent for 15 minutes...',
          fr: 'Trouvez un endroit calme. Restez en silence pendant 15 minutes...',
        },
      },
    },
    {
      taskType: 'letters-of-forgiveness',
      payload: {
        key: 'letter-superstition',
        overallTask: '5-10 Min',
        instructionText: {
          en: 'In the text box provided, write a personal letter...',
          fr: 'Dans le champ de texte prévu, écrivez une lettre personnelle...',
        },
      },
    },
    {
      taskType: 'prayer-recitation',
      payload: {
        key: 'prayer-superstition',
        overallTask: '5-10 Min',
        text: {
          en: 'Lord, I renounce all false beliefs and ask You to fill my heart with Your truth...',
          fr: 'Seigneur, je renonce à toutes croyances fausses et Te demande de remplir mon cœur de Ta vérité...',
        },
        instructionText: {
          en: 'Recite this prayer slowly and meaningfully...',
          fr: 'Récitez cette prière lentement et avec intention...',
        },
        reflectionAfterPrayerText: {
          en: 'How do you feel after reciting the prayer? Write down your thoughts.',
          fr: 'Comment vous sentez-vous après avoir récité la prière ? Écrivez vos pensées.',
        },
      },
    },
  ],
  additionalLinks: [],
  additionalVideo: {
    url: 'https://dnznrvs05pmza.cloudfront.net/b277f921-307c-4bee-b9e5-d7cb7e2dd99a.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTY5MmY1YjE2Yjk4NDBhZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0OTYwMDAwMH0.areefLzvXDCVf3k8bsP3n0knqLE4GK9bps0fASmvVKw',
  },
};

export const againstGodSins = [
  superstitionSin,
  ritualismSin,
  absenceOfReference,
  passiveCognitionSin,
  notFeelingThePresenceOfGodSin,
  сonsumerismTowardGodAndTheChurchSin,
  nonComplianceWithTheRule,
  passiveCognition2Sin,
  passiveCognition3Sin,
];
