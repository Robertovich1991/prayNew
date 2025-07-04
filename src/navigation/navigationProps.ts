import Routes from './Routes';

export type YourReferrals = {
  [Routes.REFERRAL_PROGRAM_TRANSACTION_DETAIL]: {
    referralTransaction: ReferralTransaction;
  };
};

export type WithDrawBonusWidget = {
  [Routes.REFERRAL_PROGRAM_PAY_SUBSCRIPTION]: {
    subscription: {
      id: string;
      bonusCost: number;
      periodInDays: number;
      title: string;
    };
  };
  [Routes.REFERRAL_PROGRAM_WITH_DRAW_ADD_NEW_METHOD]: {
    type: 'tether';
  };
};

export type ConfessionRoomNavigationProps = {
  [Routes.CONFESSION_ROOM]: undefined;
  [Routes.CONFESSION_ROOM_TASKS_PROGRESS_DETAIL]: {};
  [Routes.CONFESSION_ROOM_CATALOG_OF_SINS]: {
    sinSeverity: 'light' | 'medium' | 'grave';
  };
  [Routes.CONFESSION_ROOM_CONFESSION_REDEMPTION]: {
    machineName: string;
  };
  [Routes.CONFESSION_ROOM_TASK_READING_THE_BIBBLE]: {
    machineName: string;
    task: TaskReadingTheBibble;
  };
  [Routes.CONFESSION_ROOM_TASK_READING_THE_BIBBLE_CONTEXT]: {
    task: TaskReadingTheBibble;
    machineName: string;
  };
  [Routes.CONFESSION_ROOM_TASK_READING_THE_BIBBLE_SURVEY]: {
    task: TaskReadingTheBibble;
    machineName: string;
  };
  [Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION]: {
    task: TaskPrayerRecitation;
    machineName: string;
  };
  [Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION_CONTEXT]: {
    task: TaskPrayerRecitation;
    machineName: string;
  };
  [Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION_COMPLETE]: {
    task: TaskPrayerRecitation;
    machineName: string;
    isFinal: boolean;
  };
  [Routes.CONFESSION_ROOM_TASK_RELIGIOUS_RITUALS]: {
    task: TaskReligiousRituals;
    machineName: string;
  };
  [Routes.CONFESSION_ROOM_TASK_RELIGIOUS_RITUALS_PERFORMING_RITUAL]: {
    task: TaskReligiousRituals;
    machineName: string;
    ritualTaskKey: string;
  };
  [Routes.CONFESSION_ROOM_TASK_SOCIAL_TASKS]: {
    task: TaskSocialTasks;
    machineName: string;
  };
  [Routes.CONFESSION_ROOM_TASK_SOCIAL_TASKS_PERFORMING_RITUAL]: {
    task: TaskSocialTasks;
    machineName: string;
    socialTaskKey: string;
  };
};
