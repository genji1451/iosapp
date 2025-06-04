import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const lessons = [
  { id: 1, title: 'Урок 1: Тема 1' },
  { id: 2, title: 'Урок 2: Тема 2' },
  { id: 3, title: 'Урок 3: Тема 3' },
  { id: 4, title: 'Урок 4: Тема 4' },
  { id: 5, title: 'Урок 5: Тема 5' },
  { id: 6, title: 'Урок 6: Тема 6' },
];

// Общее количество заданий в уроке (должно соответствовать данным в VerbalTrainerLessonScreen)
const TOTAL_TASKS = 15;

export default function VerbalTrainerLessonsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [lessonProgress, setLessonProgress] = useState<Record<number, { currentTaskIndex: number, score: number, completed: boolean }>>({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Загрузка прогресса при фокусировке на экране
  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        setIsLoadingProgress(true);
        const progressData: Record<number, { currentTaskIndex: number, score: number, completed: boolean }> = {};
        for (const lesson of lessons) {
          const progressKey = `@verbalTrainerProgress_${lesson.id}`;
          try {
            const savedProgress = await AsyncStorage.getItem(progressKey);
            if (savedProgress !== null) {
              progressData[lesson.id] = JSON.parse(savedProgress);
            } else {
              // Если прогресса нет, инициализируем как не завершенный с 0 заданиями и счетом
              progressData[lesson.id] = { currentTaskIndex: 0, score: 0, completed: false };
            }
          } catch (error) {
            console.error(`Failed to load progress for lesson ${lesson.id}`, error);
            // В случае ошибки тоже инициализируем как не завершенный с 0 заданиями и счетом
            progressData[lesson.id] = { currentTaskIndex: 0, score: 0, completed: false };
          }
        }
        setLessonProgress(progressData);
        setIsLoadingProgress(false);
      };

      loadProgress();

    }, [])
  );

  if (isLoadingProgress) {
    return (
      <View style={styles.loadingContainer}>
         <ActivityIndicator size="large" color={colors.primary} />
         <Text style={styles.loadingText}>Загрузка прогресса...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Уроки вербального тренажера</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.lessonsList}>
          {lessons.map((lesson) => {
            const progress = lessonProgress[lesson.id] || { currentTaskIndex: 0, score: 0, completed: false };
            // Показываем 100% если урок завершен или все вопросы отвечены
            const completionPercentage = (progress.completed || progress.currentTaskIndex >= TOTAL_TASKS - 1) 
              ? 100 
              : Math.round((progress.currentTaskIndex / (TOTAL_TASKS - 1)) * 100);
            
            return (
              <TouchableOpacity
                key={lesson.id}
                style={styles.lessonButton}
                onPress={() => navigation.navigate('VerbalTrainerLesson', { lessonId: lesson.id })}
              >
                <View style={styles.lessonButtonContent}>
                   <Text style={styles.lessonButtonText}>{lesson.title}</Text>
                   <Text style={styles.progressText}>{completionPercentage}% выполнено</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
    marginRight: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  lessonsList: {
    gap: spacing.md,
  },
  lessonButton: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'space-between',
  },
  lessonButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1, // Добавим flex, чтобы текст не обрезался
    marginRight: spacing.md, // Добавим отступ справа
  },
  lessonButtonText: {
    ...typography.button,
    color: colors.text,
    flexShrink: 1, // Позволим тексту сжиматься
    marginRight: spacing.sm, // Отступ между названием и прогрессом
  },
  progressText: {
     ...typography.body,
     color: colors.textLight,
  },
  loadingContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: colors.background,
  },
  loadingText: {
     marginTop: spacing.md,
     ...typography.body,
     color: colors.text,
  },
}); 