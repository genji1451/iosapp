import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const lessons = [
  { id: 1, title: 'Вербальный тренажёр', progress: 0, isVerbal: true },
  { id: 2, title: 'Интонационный тренажёр', progress: 0, isIntonation: true },
];

export default function LessonSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Тесты</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonCard}
            onPress={() => {
              if (lesson.isVerbal) {
                navigation.navigate('VerbalTrainerMenu');
              } else if (lesson.isIntonation) {
                navigation.navigate('IntonationTrainerMenu');
              }
            }}
          >
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDescription}>
                {lesson.isVerbal 
                  ? 'Модуль тренировки речи' 
                  : lesson.isIntonation 
                    ? 'Модуль тренировки интонации'
                    : 'Тренировка слуха'
                }
              </Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>{lesson.progress}%</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  lessonCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  lessonDescription: {
    ...typography.body,
    color: colors.textLight,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    color: colors.background,
    fontWeight: '600' as const,
  },
}); 