import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import ModeSelectScreen from '../screens/ModeSelect/ModeSelectScreen';
import LessonSelectScreen from '../screens/LessonSelect/LessonSelectScreen';
import LessonScreen from '../screens/Lesson/LessonScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { Text } from 'react-native';
import { colors } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
      }}
    >
      <Tab.Screen
        name="ModeSelect"
        component={ModeSelectScreen}
        options={{
          tabBarLabel: 'Режимы',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🎯</Text>,
        }}
      />
      <Tab.Screen
        name="LessonSelect"
        component={LessonSelectScreen}
        options={{
          tabBarLabel: 'Уроки',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>📚</Text>,
        }}
      />
      <Tab.Screen
        name="Lesson"
        component={LessonScreen}
        options={{
          tabBarLabel: 'Урок',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🎧</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}; 