import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '../screens/Splash/SplashScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import TestScreen from '../screens/Test/TestScreen';
import TestMenuScreen from '../screens/TestMenu/TestMenuScreen';
import GDSTestScreen from '../screens/GDSTest/GDSTestScreen';
import TestResultScreen from '../screens/TestResult/TestResultScreen';
import { MainTabNavigator } from './MainTabNavigator';
import VerbalTrainerMenuScreen from '../screens/VerbalTrainer/VerbalTrainerMenuScreen';
import IntonationTrainerMenuScreen from '../screens/IntonationTrainerMenu/IntonationTrainerMenuScreen';
import GDSScreeningScreen from '../screens/GDSScreening/GDSScreeningScreen';
import GDSScreeningResultScreen from '../screens/GDSScreening/GDSScreeningResultScreen';
import VerbalTrainerLessonsScreen from '../screens/VerbalTrainer/VerbalTrainerLessonsScreen';
import VerbalTrainerLessonScreen from '../screens/VerbalTrainer/VerbalTrainerLessonScreen';
import VerbalTrainerLessonResultScreen from '../screens/VerbalTrainer/VerbalTrainerLessonResultScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="GDSScreening" component={GDSScreeningScreen} />
      <Stack.Screen name="GDSScreeningResult" component={GDSScreeningResultScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="TestMenu" component={TestMenuScreen} />
      <Stack.Screen name="GDSTest" component={GDSTestScreen} />
      <Stack.Screen name="TestResult" component={TestResultScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="VerbalTrainerMenu" component={VerbalTrainerMenuScreen} />
      <Stack.Screen name="IntonationTrainerMenu" component={IntonationTrainerMenuScreen} />
      <Stack.Screen name="VerbalTrainerLessons" component={VerbalTrainerLessonsScreen} />
      <Stack.Screen name="VerbalTrainerLesson" component={VerbalTrainerLessonScreen} />
      <Stack.Screen name="VerbalTrainerLessonResult" component={VerbalTrainerLessonResultScreen} />
    </Stack.Navigator>
  );
}; 