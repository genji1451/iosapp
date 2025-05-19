import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Payment: undefined;
  Test: undefined;
  TestMenu: undefined;
  GDSTest: undefined;
  TestResult: { score: number };
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  ModeSelect: undefined;
  LessonSelect: undefined;
  Lesson: undefined;
  Profile: undefined;
}; 