type SinType = 'against-god' | 'against-fellow' | 'against-yourself' | "against-truth" | 'against-neighboor'
type SinSeverity = 'light' | 'medium' | 'grave';

type SinCardImageKey =
  | 'Superstition'
  | 'PassiveCognition'
  | 'Ritualism'
  | 'NotFeelingGod'
  | 'ConsumerismTowardGodAndTheChurch'
  | 'NonComplianceWithTheRule'
  | "Passivity"
  | 'DoubtInScriptureAndTradition'

type SinCardVideoKey =
  | 'Bubbles'
  | 'Candle1'
  | 'Candle2'
  | 'Flattery'
  | 'Candles'
  | 'Columns1'
  | 'Face'
  | 'Geometry'
  | 'Mozaika1'
  | 'Sparkles'
  | 'Ingratitude_background'
  | 'Pride'
  | 'Thoughts_of_suicide'
  | 'Fornication'

type SinElement = {
  machineName: string;
  type: SinType;
  severity: SinSeverity;

  headerTitle: LanguageBasedStructure;
  description: LanguageBasedStructure;

  cardImage: SinCardImageKey;
  detailBackgroundVideo: SinCardVideoKey;

  confessionTasks: Array<ConfessionTask>;

  additionalLinks: string[];
  additionalVideo?: {
    url: string;
    preview?: string;
  };
};

type ConfessionProgress = {
  machineName: string;
  completedTasks: number;
  totalTasks: number;
  tasks: Array<{
    key: string;
    secondsLeft: number | null;
    isCompleted: boolean;
  }>;
};

type ConfessionTask =
  | {
    taskType: 'reading-the-bible';
    payload: TaskReadingTheBibble;
  }
  | {
    taskType: 'prayer-recitation';
    payload: TaskPrayerRecitation;
  }
  | {
    taskType: 'religious-rituals';
    payload: TaskReligiousRituals;
  }
  | {
    taskType: 'social-tasks';
    payload: TaskSocialTasks;
  }
  | {
    taskType: 'ecological-initiatives';
    payload: TaskEcologicalInitiatives;
  }
  | {
    taskType: 'letters-of-forgiveness';
    payload: TaskLettersOfForgiveness;
  }
  | {
    taskType: 'practice-of-silence';
    payload: TaskPracticeOfSilence;
  }
  | {
    taskType: 'fasting-and-abstinence';
    payload: TaskFastingAndAbstinence;
  };

type TaskReadingTheBibble = {
  key: string;
  text: LanguageBasedStructure;
  surveyQuestions: {
    key: string;
    description: LanguageBasedStructure;
    answers: { text: LanguageBasedStructure; isSolution: boolean }[];
  }[];
  testDurationInSeconds: number;
  overallTask: string;
  readingDurationRange: string;
  instructionText: LanguageBasedStructure;
};

type TaskPrayerRecitation = {
  key: string;
  overallTask: string;
  text: LanguageBasedStructure;
  instructionText: LanguageBasedStructure;
  reflectionAfterPrayerText: LanguageBasedStructure;
};

type TaskReligiousRituals = {
  key: string;
  overallTask: string;
  listOfRites: LanguageBasedStructure[];
  instructionText: LanguageBasedStructure;
};

type TaskSocialTasks = {
  key: string;
  overallTask: string;
  listOfSocialTasks: LanguageBasedStructure[];
  instructionText: LanguageBasedStructure;
};

type TaskEcologicalInitiatives = {
  key: string;
  overallTask: string;
  listOfRites: LanguageBasedStructure[];
  instructionText: LanguageBasedStructure;
};

type TaskLettersOfForgiveness = {
  key: string;
  overallTask: string;
  instructionText: LanguageBasedStructure;
};

type TaskPracticeOfSilence = {
  key: string;
  overallTask: string;
  testDurationInSeconds: number;
  instructionText: LanguageBasedStructure;
};

type TaskFastingAndAbstinence = {
  key: string;
  overallTask: string;
  instructionText: LanguageBasedStructure;
};
