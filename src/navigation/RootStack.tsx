import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Home from 'screens/tabScreens/Home';
import Routes from './Routes';
import Tarif from 'screens/Tarif';
import About from 'screens/About';
import Profile from 'screens/profile/Profile';
import PrivacyPolicy from 'screens/profile/PrivacyPolicy';
import JoinCommunity from 'screens/profile/JoinCommunity';
import EditProfile from 'screens/profile/EditProfile';
import PrayerRequest from 'screens/profile/PrayerRequest';
import PastorsInfo from 'screens/PastorsInfo';
import PrayerScreen from 'screens/PrayerScreen';
import BottomMenu from 'components/BottomMenu';
import Prayers from 'screens/tabScreens/Prayers';
import Pastors from 'screens/tabScreens/Pastors';
import Articles from 'screens/tabScreens/Articles';
import Donations from 'screens/tabScreens/Donations';
import ChatWithPriest from 'screens/ChatWithPriest';
import WelcomeScreen from 'screens/WelcomeScreen';
import Settings from 'screens/profile/Settings';
import PriestOnline from 'screens/PriestOnline';
import SelectLanguage from 'screens/SelectLanguage';
import MusicalAccompaniment from 'screens/MusicalAccompaniment';
import AvoidService from 'screens/profile/AvoidService';
import ReferralProgram from 'screens/referral-program/ReferralProgram';
import ReferralProgramCalculationScheme from 'screens/referral-program/ReferralProgramCalculationScheme';
import ReferralProgramHowItWorks from 'screens/referral-program/ReferralProgramHowItWorks';
import ReferralProgramTransactionDetail from 'screens/referral-program/ReferralProgramTransactionDetail';
import ReferralProgramPaySubscription from 'screens/referral-program/ReferralProgramPaySubscription';
import ReferralProgramWithDrawAddNewMethod from 'screens/referral-program/ReferralProgramWithDrawAddNewMethod';
import ConfessionRoom from 'screens/confession-room/ConfessionRoom';
import CatalogOfSins from 'screens/confession-room/CatalogOfSins';
import TasksProgressDetail from 'screens/confession-room/TasksProgressDetail';
import ConfessionRedemption from 'screens/confession-room/ConfessionRedemtion';
import TaskReadingTheBible from 'screens/confession-room/task-reading-the-bibble/TaskReadingTheBible';
import TaskReadingTheBibleContext from 'screens/confession-room/task-reading-the-bibble/TaskReadingTheBibleContext';
import TaskReadingTheBibleSurvey from 'screens/confession-room/task-reading-the-bibble/TaskReadingTheBibleSurvey';
import TaskPrayerRecitation from 'screens/confession-room/task-prayer-recitation/TaskPrayerRecitation';
import TaskPrayerRecitationContext from 'screens/confession-room/task-prayer-recitation/TaskPrayerRecitationContext';
import TaskPrayerRecitationComplete from 'screens/confession-room/task-prayer-recitation/TaskPrayerRecitationComplete';
import TaskReligiousRituals from 'screens/confession-room/task-religious-rituals/TaskReligiousRituals';
import TaskReligiousRitualsPerformingRitual from 'screens/confession-room/task-religious-rituals/TaskReligiousRitualsPerformingRitual';
import TaskSocialTasks from 'screens/confession-room/task-social-tasks/TaskSocialTasks';
import TaskSocialTasksPerformingRitual from 'screens/confession-room/task-social-tasks/TaskSocialTasksPerformingRitual';

const RootStack = createStackNavigator();

export default () => {
  return (
    <>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={Routes.WELCOME_SCREEN}
      >
        <RootStack.Screen
          name={Routes.WELCOME_SCREEN}
          component={WelcomeScreen}
        />
        <RootStack.Screen name={Routes.HOME_SCREEN} component={Home} />
        <RootStack.Screen name={Routes.ABOUT_US_SCREEN} component={About} />
        <RootStack.Screen name={Routes.TARIF_SCREEN} component={Tarif} />
        <RootStack.Screen name={Routes.PROFILE_SCREEN} component={Profile} />
        <RootStack.Screen
          name={Routes.PRIVACY_POLICY}
          component={PrivacyPolicy}
        />
        <RootStack.Screen
          name={Routes.AVOID_SERVICE}
          component={AvoidService}
        />
        <RootStack.Screen
          name={Routes.JOIN_COMMUNITY}
          component={JoinCommunity}
        />
        <RootStack.Screen name={Routes.EDIT_PROFILE} component={EditProfile} />
        <RootStack.Screen
          name={Routes.PRAYER_REQUEST}
          component={PrayerRequest}
        />
        <RootStack.Screen name={Routes.PASTORS_INFO} component={PastorsInfo} />
        <RootStack.Screen
          name={Routes.PRAYER_SCREEN}
          component={PrayerScreen}
        />
        <RootStack.Screen name={Routes.BOTTOM_MENU} component={BottomMenu} />
        <RootStack.Screen name={Routes.PRAYERS} component={Prayers} />
        <RootStack.Screen name={Routes.PASTORS} component={Pastors} />
        <RootStack.Screen name={Routes.ARTICLES} component={Articles} />
        <RootStack.Screen name={Routes.DONATIONS} component={Donations} />
        <RootStack.Screen
          name={Routes.CHAT_WITH_PRIEST}
          component={ChatWithPriest}
        />
        <RootStack.Screen name={Routes.SETTINGS} component={Settings} />
        <RootStack.Screen
          name={Routes.PRIEST_ONLINE}
          component={PriestOnline}
        />
        <RootStack.Screen
          name={Routes.SELECT_LANGUAGE}
          component={SelectLanguage}
        />
        <RootStack.Screen
          name={Routes.MUSICAL_ACCOMPANIMENT}
          component={MusicalAccompaniment}
        />
        <RootStack.Screen
          name={Routes.REFERRAL_PROGRAM}
          component={ReferralProgram}
        />
        <RootStack.Screen
          name={Routes.REFERRAL_PROGRAM_CALCULATION_SCHEME}
          component={ReferralProgramCalculationScheme}
        />
        <RootStack.Screen
          name={Routes.REFERRAL_PROGRAM_HOW_IT_WORKS}
          component={ReferralProgramHowItWorks}
        />
        <RootStack.Screen
          name={Routes.REFERRAL_PROGRAM_TRANSACTION_DETAIL}
          component={ReferralProgramTransactionDetail}
        />
        <RootStack.Screen
          name={Routes.REFERRAL_PROGRAM_PAY_SUBSCRIPTION}
          component={ReferralProgramPaySubscription}
        />
        <RootStack.Screen
          name={Routes.REFERRAL_PROGRAM_WITH_DRAW_ADD_NEW_METHOD}
          component={ReferralProgramWithDrawAddNewMethod}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM}
          component={ConfessionRoom}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_CATALOG_OF_SINS}
          component={CatalogOfSins}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASKS_PROGRESS_DETAIL}
          component={TasksProgressDetail}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_CONFESSION_REDEMPTION}
          component={ConfessionRedemption}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_READING_THE_BIBBLE}
          component={TaskReadingTheBible}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_READING_THE_BIBBLE_CONTEXT}
          component={TaskReadingTheBibleContext}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_READING_THE_BIBBLE_SURVEY}
          component={TaskReadingTheBibleSurvey}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION}
          component={TaskPrayerRecitation}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION_CONTEXT}
          component={TaskPrayerRecitationContext}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION_COMPLETE}
          component={TaskPrayerRecitationComplete}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_RELIGIOUS_RITUALS}
          component={TaskReligiousRituals}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_RELIGIOUS_RITUALS_PERFORMING_RITUAL}
          component={TaskReligiousRitualsPerformingRitual}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_SOCIAL_TASKS}
          component={TaskSocialTasks}
        />
        <RootStack.Screen
          name={Routes.CONFESSION_ROOM_TASK_SOCIAL_TASKS_PERFORMING_RITUAL}
          component={TaskSocialTasksPerformingRitual}
        />
      </RootStack.Navigator>
    </>
  );
};
