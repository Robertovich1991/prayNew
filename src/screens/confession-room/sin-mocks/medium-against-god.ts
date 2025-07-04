const DoubtInScriptureAndTradition: SinElement = {
  machineName: "doubt-in-scripture-and-tradition",
  type: "against-god",
  severity: "medium",
  headerTitle: {
    en: "Doubt in Scripture and Tradition",
    fr: "Doute dans les Saintes Écritures et la Tradition",
  },
  description: {
    en: "Doubting the truth of the Holy Scriptures, Church teachings, canon laws, hierarchy, and writings of the Church Fathers weakens our communion with the Body of Christ. Let us seek clarity in prayer and return to faithful trust.",
    fr: "Douter de la vérité des Saintes Écritures, des enseignements de l'Église, des lois canoniques, de la hiérarchie et des écrits des Pères de l'Église affaiblit notre communion avec le Corps du Christ. Cherchons la clarté dans la prière et revenons à une confiance fidèle.",
  },
  cardImage: "DoubtInScriptureAndTradition",
  detailBackgroundVideo: "videos/doubt-in-scripture-and-tradition_background.mp4",
  confessionTasks: [
    {
      taskType: "reading-the-bible",
      payload: {
        key: "doubt-read-scripture",
        text: {
          en: "Read passages related to Scripture and Tradition and reflect on God's truth.",
          fr: "Lisez des passages liés aux Saintes Écritures et à la Tradition, et réfléchissez à la vérité de Dieu.",
        },
        surveyQuestions: [],
        testDurationInSeconds: 180,
        overallTask: "Read the selected Scriptures and reflect deeply.",
        readingDurationRange: "3-5 minutes",
        instructionText: {
          en: "Find a quiet place. Read with attention and ask God to open your heart.",
          fr: "Trouvez un endroit calme. Lisez avec attention et demandez à Dieu d’ouvrir votre cœur.",
        },
      },
    },
    {
      taskType: "prayer-recitation",
      payload: {
        key: "doubt-prayer",
        overallTask: "Recite a prayer asking God for clarity and renewed faith.",
        text: {
          en: "Lord, help me overcome doubts and trust in the truth You revealed through Your Church and Word.",
          fr: "Seigneur, aide-moi à surmonter mes doutes et à faire confiance à la vérité que Tu as révélée par Ton Église et Ta Parole.",
        },
        instructionText: {
          en: "Recite this prayer sincerely every morning.",
          fr: "Récitez cette prière sincèrement chaque matin.",
        },
        reflectionAfterPrayerText: {
          en: "Take a moment to sit quietly and listen to God's peace.",
          fr: "Prenez un moment pour rester en silence et écouter la paix de Dieu.",
        },
      },
    },
    {
      taskType: "letters-of-forgiveness",
      payload: {
        key: "doubt-letter",
        overallTask: "Write a letter to God admitting your doubts and asking for forgiveness.",
        text: {
          en: "Dear God, I confess my moments of confusion and hesitation. Help me return to full trust.",
          fr: "Cher Dieu, je confesse mes moments de confusion et d’hésitation. Aide-moi à revenir à une confiance totale.",
        },
        instructionText: {
          en: "Write this in your journal or on your phone with honesty.",
          fr: "Écrivez cela dans votre journal ou sur votre téléphone avec honnêteté.",
        },
      },
    },
    {
      taskType: "practice-of-silence",
      payload: {
        key: "doubt-silence",
        overallTask: "Spend five minutes in silence before God, asking Him to strengthen your faith.",
        text: {
          en: "Let silence calm your mind and clear space for God's voice.",
          fr: "Laissez le silence apaiser votre esprit et faire de la place pour la voix de Dieu.",
        },
        instructionText: {
          en: "Sit quietly and say in your heart: 'Lord, I trust You.'",
          fr: "Asseyez-vous en silence et dites dans votre cœur : 'Seigneur, je Te fais confiance.'",
        },
      },
    },
    {
      taskType: "religious-rituals",
      payload: {
        key: "doubt-ritual",
        overallTask: "Attend a church service or sacred rite with a heart open to learning and reverence.",
        text: {
          en: "Let your body and spirit be present in worship. Participate with intention.",
          fr: "Que votre corps et votre esprit soient présents dans le culte. Participez avec intention.",
        },
        instructionText: {
          en: "Prepare your heart before attending. Expect God to speak.",
          fr: "Préparez votre cœur avant d’y aller. Attendez-vous à ce que Dieu parle.",
        },
      },
    },
    {
      taskType: "social-tasks",
      payload: {
        key: "doubt-talk",
        overallTask: "Talk with a trusted person about your journey in faith and understanding.",
        listOfSocialTasks: [
          {
            en: "Share how you are learning to trust God's truth more deeply.",
            fr: "Partagez comment vous apprenez à faire davantage confiance à la vérité de Dieu.",
          },
        ],
        instructionText: {
          en: "Be open and let the conversation build your faith.",
          fr: "Soyez ouvert et laissez la conversation fortifier votre foi.",
        },
      },
    },
  ],
  additionalLinks: [],
};



const doubtInChristianDoctrine: SinElement = {
  machineName: "doubt-in-christian-doctrine",
  type: "against-god",
  severity: "medium",
  headerTitle: {
    en: "Doubt in Christian Doctrine",
    fr: "Doute dans la doctrine chrétienne"
  },
  description: {
    en: "Doubting the truth of Christ's teaching, the Gospel commandments, or the holiness of saints distances us from the foundation of our faith. Let us bring our doubts to God and seek wisdom in His Church.",
    fr: "Douter de la vérité de l’enseignement du Christ, des commandements évangéliques ou de la sainteté des saints nous éloigne des fondements de notre foi. Apportons nos doutes à Dieu et cherchons la sagesse dans Son Église."
  },
  cardImage: "DoubtInChristianDoctrine",
  detailBackgroundVideo: "videos/doubt-in-christian-doctrine_background.mp4",
  confessionTasks: [
    {
      taskType: "reading-the-bible",
      payload: {
        key: "doctrine-read-scripture",
        text: {
          en: "Read passages related to Christian teachings and reflect on God's truth.",
          fr: "Lisez des passages liés aux enseignements chrétiens et réfléchissez à la vérité de Dieu."
        },
        surveyQuestions: [],
        testDurationInSeconds: 180,
        overallTask: "Read the selected Scriptures and reflect deeply.",
        readingDurationRange: "3-5 minutes",
        instructionText: {
          en: "Find a quiet place. Read with attention and ask God to open your heart.",
          fr: "Trouvez un endroit calme. Lisez avec attention et demandez à Dieu d’ouvrir votre cœur."
        }
      }
    },
    {
      taskType: "prayer-recitation",
      payload: {
        key: "doctrine-prayer",
        overallTask: "Recite a prayer asking God for clarity and renewed faith.",
        text: {
          en: "Lord, help me overcome doubts and trust in the truth You revealed through Your Church and Word.",
          fr: "Seigneur, aide-moi à surmonter mes doutes et à faire confiance à la vérité que Tu as révélée par Ton Église et Ta Parole."
        },
        instructionText: {
          en: "Recite this prayer sincerely every morning.",
          fr: "Récitez cette prière sincèrement chaque matin."
        },
        reflectionAfterPrayerText: {
          en: "Take a moment to sit quietly and listen to God's peace.",
          fr: "Prenez un moment pour rester en silence et écouter la paix de Dieu."
        }
      }
    },
    {
      taskType: "letters-of-forgiveness",
      payload: {
        key: "doctrine-letter",
        overallTask: "Write a letter to God admitting your doubts and asking for forgiveness.",
        text: {
          en: "Dear God, I confess my moments of confusion and hesitation. Help me return to full trust.",
          fr: "Cher Dieu, je confesse mes moments de confusion et d’hésitation. Aide-moi à revenir à une confiance totale."
        },
        instructionText: {
          en: "Write this in your journal or on your phone with honesty.",
          fr: "Écrivez cela dans votre journal ou sur votre téléphone avec honnêteté."
        }
      }
    },
    {
      taskType: "practice-of-silence",
      payload: {
        key: "doctrine-silence",
        overallTask: "Spend five minutes in silence before God, asking Him to strengthen your faith.",
        text: {
          en: "Let silence calm your mind and clear space for God's voice.",
          fr: "Laissez le silence apaiser votre esprit et faire de la place pour la voix de Dieu."
        },
        instructionText: {
          en: "Sit quietly and say in your heart: 'Lord, I trust You.'",
          fr: "Asseyez-vous en silence et dites dans votre cœur : 'Seigneur, je Te fais confiance.'"
        }
      }
    },
    {
      taskType: "religious-rituals",
      payload: {
        key: "doctrine-ritual",
        overallTask: "Attend a church service or sacred rite with a heart open to learning and reverence.",
        text: {
          en: "Let your body and spirit be present in worship. Participate with intention.",
          fr: "Que votre corps et votre esprit soient présents dans le culte. Participez avec intention."
        },
        instructionText: {
          en: "Prepare your heart before attending. Expect God to speak.",
          fr: "Préparez votre cœur avant d’y aller. Attendez-vous à ce que Dieu parle."
        }
      }
    },
    {
      taskType: "social-tasks",
      payload: {
        key: "doctrine-talk",
        overallTask: "Talk with a trusted person about your journey in faith and understanding.",
        listOfSocialTasks: [
          {
            en: "Share how you are learning to trust God's truth more deeply.",
            fr: "Partagez comment vous apprenez à faire davantage confiance à la vérité de Dieu."
          }
        ],
        instructionText: {
          en: "Be open and let the conversation build your faith.",
          fr: "Soyez ouvert et laissez la conversation fortifier votre foi."
        }
      }
    }
  ],
  additionalLinks: []
};

const blasphemousAttitudeTowardsGod :SinElement= {
  machineName: "blasphemous-attitude-towards-god",
  type: "against-god",
  severity: "medium",
  headerTitle: {
    en: "Blasphemous Attitude Towards God",
    fr: "Attitude blasphématoire envers Dieu"
  },
  description: {
    en: "Taking God's name lightly or joking about sacred things dishonors His holiness. Reverence is the beginning of worship. Let us repent and speak of Him with awe.",
    fr: "Prendre le nom de Dieu à la légère ou plaisanter sur les choses sacrées déshonore Sa sainteté. La révérence est le commencement du culte. Repentons-nous et parlons de Lui avec respect."
  },
  cardImage: "BlasphemousAttitudeTowardsGod",
  detailBackgroundVideo: "videos/blasphemous-attitude-towards-god_background.mp4",
  confessionTasks: [
    {
      taskType: "reading-the-bible",
      payload: {
        key: "blasphemy-read-scripture",
        text: {
          en: "Read passages related to Reverence and speech and reflect on God's truth.",
          fr: "Lisez des passages liés à la révérence et les paroles et réfléchissez à la vérité de Dieu."
        },
        surveyQuestions: [],
        testDurationInSeconds: 180,
        overallTask: "Read the selected Scriptures and reflect deeply.",
        readingDurationRange: "3-5 minutes",
        instructionText: {
          en: "Find a quiet place. Read with attention and ask God to open your heart.",
          fr: "Trouvez un endroit calme. Lisez avec attention et demandez à Dieu d’ouvrir votre cœur."
        }
      }
    },
    {
      taskType: "prayer-recitation",
      payload: {
        key: "blasphemy-prayer",
        overallTask: "Recite a prayer asking God for clarity and renewed faith.",
        text: {
          en: "Lord, help me overcome doubts and trust in the truth You revealed through Your Church and Word.",
          fr: "Seigneur, aide-moi à surmonter mes doutes et à faire confiance à la vérité que Tu as révélée par Ton Église et Ta Parole."
        },
        instructionText: {
          en: "Recite this prayer sincerely every morning.",
          fr: "Récitez cette prière sincèrement chaque matin."
        },
        reflectionAfterPrayerText: {
          en: "Take a moment to sit quietly and listen to God's peace.",
          fr: "Prenez un moment pour rester en silence et écouter la paix de Dieu."
        }
      }
    },
    {
      taskType: "letters-of-forgiveness",
      payload: {
        key: "blasphemy-letter",
        overallTask: "Write a letter to God admitting your doubts and asking for forgiveness.",
        text: {
          en: "Dear God, I confess my moments of confusion and hesitation. Help me return to full trust.",
          fr: "Cher Dieu, je confesse mes moments de confusion et d’hésitation. Aide-moi à revenir à une confiance totale."
        },
        instructionText: {
          en: "Write this in your journal or on your phone with honesty.",
          fr: "Écrivez cela dans votre journal ou sur votre téléphone avec honnêteté."
        }
      }
    },
    {
      taskType: "practice-of-silence",
      payload: {
        key: "blasphemy-silence",
        overallTask: "Spend five minutes in silence before God, asking Him to strengthen your faith.",
        text: {
          en: "Let silence calm your mind and clear space for God's voice.",
          fr: "Laissez le silence apaiser votre esprit et faire de la place pour la voix de Dieu."
        },
        instructionText: {
          en: "Sit quietly and say in your heart: 'Lord, I trust You.'",
          fr: "Asseyez-vous en silence et dites dans votre cœur : 'Seigneur, je Te fais confiance.'"
        }
      }
    },
    {
      taskType: "religious-rituals",
      payload: {
        key: "blasphemy-ritual",
        overallTask: "Attend a church service or sacred rite with a heart open to learning and reverence.",
        text: {
          en: "Let your body and spirit be present in worship. Participate with intention.",
          fr: "Que votre corps et votre esprit soient présents dans le culte. Participez avec intention."
        },
        instructionText: {
          en: "Prepare your heart before attending. Expect God to speak.",
          fr: "Préparez votre cœur avant d’y aller. Attendez-vous à ce que Dieu parle."
        }
      }
    },
    {
      taskType: "social-tasks",
      payload: {
        key: "blasphemy-talk",
        overallTask: "Talk with a trusted person about your journey in faith and understanding.",
        listOfSocialTasks: [
          {
            en: "Share how you are learning to trust God's truth more deeply.",
            fr: "Partagez comment vous apprenez à faire davantage confiance à la vérité de Dieu."
          }
        ],
        instructionText: {
          en: "Be open and let the conversation build your faith.",
          fr: "Soyez ouvert et laissez la conversation fortifier votre foi."
        }
      }
    }
  ],
  additionalLinks: []
};

const denialOfFaithOutOfFear:SinElement = {
  machineName: "denial-of-faith-out-of-fear",
  type: "against-god",
  severity: "medium",
  headerTitle: {
    en: "Denial of Faith Out of Fear",
    fr: "Renier la foi par peur"
  },
  description: {
    en: "When we deny God because of fear or pursuit of worldly comfort, we trade eternal truth for temporary gain. Christ calls us to stand firm in our faith.",
    fr: "Lorsque nous renions Dieu par peur ou pour un confort terrestre, nous échangeons la vérité éternelle contre un gain temporaire. Le Christ nous appelle à demeurer fermes dans notre foi."
  },
  cardImage: "DenialOfFaithOutOfFear",
  detailBackgroundVideo: "videos/denial-of-faith-out-of-fear_background.mp4",
  confessionTasks: [
    {
      taskType: "reading-the-bible",
      payload: {
        key: "denial-read-scripture",
        text: {
          en: "Read passages related to Faith under pressure and reflect on God's truth.",
          fr: "Lisez des passages liés à la foi sous pression et réfléchissez à la vérité de Dieu."
        },
        surveyQuestions: [],
        testDurationInSeconds: 180,
        overallTask: "Read the selected Scriptures and reflect deeply.",
        readingDurationRange: "3-5 minutes",
        instructionText: {
          en: "Find a quiet place. Read with attention and ask God to open your heart.",
          fr: "Trouvez un endroit calme. Lisez avec attention et demandez à Dieu d’ouvrir votre cœur."
        }
      }
    },
    {
      taskType: "prayer-recitation",
      payload: {
        key: "denial-prayer",
        overallTask: "Recite a prayer asking God for clarity and renewed faith.",
        text: {
          en: "Lord, help me overcome doubts and trust in the truth You revealed through Your Church and Word.",
          fr: "Seigneur, aide-moi à surmonter mes doutes et à faire confiance à la vérité que Tu as révélée par Ton Église et Ta Parole."
        },
        instructionText: {
          en: "Recite this prayer sincerely every morning.",
          fr: "Récitez cette prière sincèrement chaque matin."
        },
        reflectionAfterPrayerText: {
          en: "Take a moment to sit quietly and listen to God's peace.",
          fr: "Prenez un moment pour rester en silence et écouter la paix de Dieu."
        }
      }
    },
    {
      taskType: "letters-of-forgiveness",
      payload: {
        key: "denial-letter",
        overallTask: "Write a letter to God admitting your doubts and asking for forgiveness.",
        text: {
          en: "Dear God, I confess my moments of confusion and hesitation. Help me return to full trust.",
          fr: "Cher Dieu, je confesse mes moments de confusion et d’hésitation. Aide-moi à revenir à une confiance totale."
        },
        instructionText: {
          en: "Write this in your journal or on your phone with honesty.",
          fr: "Écrivez cela dans votre journal ou sur votre téléphone avec honnêteté."
        }
      }
    },
    {
      taskType: "practice-of-silence",
      payload: {
        key: "denial-silence",
        overallTask: "Spend five minutes in silence before God, asking Him to strengthen your faith.",
        text: {
          en: "Let silence calm your mind and clear space for God's voice.",
          fr: "Laissez le silence apaiser votre esprit et faire de la place pour la voix de Dieu."
        },
        instructionText: {
          en: "Sit quietly and say in your heart: 'Lord, I trust You.'",
          fr: "Asseyez-vous en silence et dites dans votre cœur : 'Seigneur, je Te fais confiance.'"
        }
      }
    },
    {
      taskType: "religious-rituals",
      payload: {
        key: "denial-ritual",
        overallTask: "Attend a church service or sacred rite with a heart open to learning and reverence.",
        text: {
          en: "Let your body and spirit be present in worship. Participate with intention.",
          fr: "Que votre corps et votre esprit soient présents dans le culte. Participez avec intention."
        },
        instructionText: {
          en: "Prepare your heart before attending. Expect God to speak.",
          fr: "Préparez votre cœur avant d’y aller. Attendez-vous à ce que Dieu parle."
        }
      }
    },
    {
      taskType: "social-tasks",
      payload: {
        key: "denial-talk",
        overallTask: "Talk with a trusted person about your journey in faith and understanding.",
        listOfSocialTasks: [
          {
            en: "Share how you are learning to trust God's truth more deeply.",
            fr: "Partagez comment vous apprenez à faire davantage confiance à la vérité de Dieu."
          }
        ],
        instructionText: {
          en: "Be open and let the conversation build your faith.",
          fr: "Soyez ouvert et laissez la conversation fortifier votre foi."
        }
      }
    }
  ],
  additionalLinks: []
};

const irreverenceTowardsSacraments:SinElement = {
  machineName: "irreverence-towards-sacraments",
  type: "against-god",
  severity: "medium",
  headerTitle: {
    en: "Irreverence Towards the Sacraments",
    fr: "Irrespect envers les Sacrements"
  },
  description: {
    en: "Treating the Holy Sacraments without reverence or failing to honor the Holy Gifts is a grave offense. The mysteries of the Church are to be received with awe and faith. Let us return to the altar with humility.",
    fr: "Traiter les Saints Sacrements sans révérence ou ne pas honorer les Saints Dons est une faute grave. Les mystères de l'Église doivent être reçus avec crainte et foi. Revenons à l'autel avec humilité."
  },
  cardImage: "IrreverenceSacraments",
  detailBackgroundVideo: "videos/irreverence_towards_sacraments_background.mp4",
  confessionTasks: [
    {
      taskType: "reading-the-bible",
      payload: {
        key: "sacraments-read-scripture",
        text: {
          en: "Read passages related to the holiness of the Sacraments and reflect on God's truth.",
          fr: "Lisez des passages liés à la sainteté des Sacrements et réfléchissez à la vérité de Dieu."
        },
        surveyQuestions: [],
        testDurationInSeconds: 180,
        overallTask: "Read the selected Scriptures and reflect deeply.",
        readingDurationRange: "3-5 minutes",
        instructionText: {
          en: "Find a quiet place. Read with attention and ask God to open your heart.",
          fr: "Trouvez un endroit calme. Lisez avec attention et demandez à Dieu d’ouvrir votre cœur."
        }
      }
    },
    {
      taskType: "prayer-recitation",
      payload: {
        key: "sacraments-prayer",
        overallTask: "Recite a prayer asking God for clarity and renewed faith.",
        text: {
          en: "Lord, help me overcome doubts and trust in the truth You revealed through Your Church and Word.",
          fr: "Seigneur, aide-moi à surmonter mes doutes et à faire confiance à la vérité que Tu as révélée par Ton Église et Ta Parole."
        },
        instructionText: {
          en: "Recite this prayer sincerely every morning.",
          fr: "Récitez cette prière sincèrement chaque matin."
        },
        reflectionAfterPrayerText: {
          en: "Take a moment to sit quietly and listen to God's peace.",
          fr: "Prenez un moment pour rester en silence et écouter la paix de Dieu."
        }
      }
    },
    {
      taskType: "letters-of-forgiveness",
      payload: {
        key: "sacraments-letter",
        overallTask: "Write a letter to God admitting your doubts and asking for forgiveness.",
        text: {
          en: "Dear God, I confess my moments of confusion and hesitation. Help me return to full trust.",
          fr: "Cher Dieu, je confesse mes moments de confusion et d’hésitation. Aide-moi à revenir à une confiance totale."
        },
        instructionText: {
          en: "Write this in your journal or on your phone with honesty.",
          fr: "Écrivez cela dans votre journal ou sur votre téléphone avec honnêteté."
        }
      }
    },
    {
      taskType: "practice-of-silence",
      payload: {
        key: "sacraments-silence",
        overallTask: "Spend five minutes in silence before God, asking Him to strengthen your faith.",
        text: {
          en: "Let silence calm your mind and clear space for God's voice.",
          fr: "Laissez le silence apaiser votre esprit et faire de la place pour la voix de Dieu."
        },
        instructionText: {
          en: "Sit quietly and say in your heart: 'Lord, I trust You.'",
          fr: "Asseyez-vous en silence et dites dans votre cœur : 'Seigneur, je Te fais confiance.'"
        }
      }
    },
    {
      taskType: "religious-rituals",
      payload: {
        key: "sacraments-ritual",
        overallTask: "Attend a church service or sacred rite with a heart open to learning and reverence.",
        text: {
          en: "Let your body and spirit be present in worship. Participate with intention.",
          fr: "Que votre corps et votre esprit soient présents dans le culte. Participez avec intention."
        },
        instructionText: {
          en: "Prepare your heart before attending. Expect God to speak.",
          fr: "Préparez votre cœur avant d’y aller. Attendez-vous à ce que Dieu parle."
        }
      }
    },
    {
      taskType: "social-tasks",
      payload: {
        key: "sacraments-talk",
        overallTask: "Talk with a trusted person about your journey in faith and understanding.",
        listOfSocialTasks: [
          {
            en: "Share how you are learning to trust God's truth more deeply.",
            fr: "Partagez comment vous apprenez à faire davantage confiance à la vérité de Dieu."
          }
        ],
        instructionText: {
          en: "Be open and let the conversation build your faith.",
          fr: "Soyez ouvert et laissez la conversation fortifier votre foi."
        }
      }
    }
  ],
  additionalLinks: []
};


export const mediumAgainstGodSins = [
 DoubtInScriptureAndTradition,
 irreverenceTowardsSacraments,
 doubtInChristianDoctrine,
 blasphemousAttitudeTowardsGod,
 denialOfFaithOutOfFear
];
