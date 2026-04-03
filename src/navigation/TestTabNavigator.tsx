import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TestMenuScreen from '../screens/TestMenu/TestMenuScreen';
import GDSTestScreen from '../screens/GDSTest/GDSTestScreen';
import TestResultScreen from '../screens/TestResult/TestResultScreen';
import CognitiveProfileTestScreen from '../screens/CognitiveProfile/CognitiveProfileTestScreen';
import CognitiveProfileResultScreen from '../screens/CognitiveProfile/CognitiveProfileResultScreen';

export type TestTabParamList = {
  TestMenu: undefined;
  GDSTest: undefined;
  TestResult: { score: number };
  CognitiveProfileTest: undefined;
  CognitiveProfileResult: {
    score: number;
    total: number;
    domainScores: {
      memory: number;
      attention: number;
      executive: number;
      language: number;
    };
  };
};

const Stack = createNativeStackNavigator<TestTabParamList>();

export function TestTabNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TestMenu">
      <Stack.Screen name="TestMenu" component={TestMenuScreen} />
      <Stack.Screen name="GDSTest" component={GDSTestScreen} />
      <Stack.Screen name="TestResult" component={TestResultScreen} />
      <Stack.Screen name="CognitiveProfileTest" component={CognitiveProfileTestScreen} />
      <Stack.Screen name="CognitiveProfileResult" component={CognitiveProfileResultScreen} />
    </Stack.Navigator>
  );
}

