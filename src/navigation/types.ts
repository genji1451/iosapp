import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Payment: undefined;
  GDSScreening: undefined;
  GDSScreeningResult: { score: number; hasDepression: boolean };
  Test: undefined;
  TestMenu: undefined;
  GDSTest: undefined;
  TestResult: { score: number };
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  VerbalTrainerMenu: undefined;
  IntonationTrainerMenu: undefined;
  VerbalTrainerLessons: undefined;
  VerbalTrainerLesson: { lessonId: number };
  VerbalTrainerLessonResult: { score: number; lessonId: number };
};

export type MainTabParamList = {
  ModeSelect: undefined;
  LessonSelect: undefined;
  TestMenu: undefined;
  Profile: undefined;
}; 