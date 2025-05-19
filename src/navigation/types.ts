import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Payment: undefined;
  Test: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  ModeSelect: undefined;
  LessonSelect: undefined;
  Lesson: undefined;
  Profile: undefined;
}; 