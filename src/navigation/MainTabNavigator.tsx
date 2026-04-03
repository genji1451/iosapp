import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import ModeSelectScreen from '../screens/ModeSelect/ModeSelectScreen';
import LessonSelectScreen from '../screens/LessonSelect/LessonSelectScreen';
import { TestTabNavigator } from './TestTabNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', letterSpacing: 0.2 },
      }}
    >
      <Tab.Screen
        name="ModeSelect"
        component={ModeSelectScreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tab.Screen
        name="LessonSelect"
        component={LessonSelectScreen}
        options={{
          tabBarLabel: 'Уроки',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tab.Screen
        name="TestMenu"
        component={TestTabNavigator}
        options={{
          tabBarLabel: 'Тесты',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="head-cog" color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size ?? 24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
