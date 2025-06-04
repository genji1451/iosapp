import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function VerbalTrainerMenuScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'ModeSelect' })}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Я-СЛЫШУ</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.verticalButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerbalTrainerLessons')}>
            <Text style={styles.buttonText}>Тренировка</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Контроль</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description}>
          Вербальный тренажер предназначен для тренировки распознавания слов на слух.
          Вы будете слушать слова и выбирать правильный вариант из предложенных.
          Регулярные занятия помогут улучшить ваше восприятие речи.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
    marginRight: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    fontWeight: typography.h1.fontWeight as 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  verticalButtons: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.button,
    color: colors.background,
    fontWeight: typography.button.fontWeight as 'bold',
  },
  description: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
}); 