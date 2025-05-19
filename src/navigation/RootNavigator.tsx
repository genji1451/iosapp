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
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="TestMenu" component={TestMenuScreen} />
      <Stack.Screen name="GDSTest" component={GDSTestScreen} />
      <Stack.Screen name="TestResult" component={TestResultScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}; 