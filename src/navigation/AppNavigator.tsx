import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '../screens/Splash/SplashScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import { MainTabNavigator } from './MainTabNavigator';
import GDSScreeningScreen from '../screens/GDSScreening/GDSScreeningScreen';
import GDSScreeningResultScreen from '../screens/GDSScreening/GDSScreeningResultScreen';
import TestMenuScreen from '../screens/TestMenu/TestMenuScreen';
import GDSTestScreen from '../screens/GDSTest/GDSTestScreen';
import TestResultScreen from '../screens/TestResult/TestResultScreen';
import VerbalTrainerMenuScreen from '../screens/VerbalTrainerMenu/VerbalTrainerMenuScreen';
import IntonationTrainerMenuScreen from '../screens/IntonationTrainerMenu/IntonationTrainerMenuScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="GDSScreening" component={GDSScreeningScreen} />
        <Stack.Screen name="GDSScreeningResult" component={GDSScreeningResultScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="TestMenu" component={TestMenuScreen} />
        <Stack.Screen name="GDSTest" component={GDSTestScreen} />
        <Stack.Screen name="TestResult" component={TestResultScreen} />
        <Stack.Screen name="VerbalTrainerMenu" component={VerbalTrainerMenuScreen} />
        <Stack.Screen name="IntonationTrainerMenu" component={IntonationTrainerMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 