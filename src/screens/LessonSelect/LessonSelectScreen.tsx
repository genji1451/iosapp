import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../../theme';

const lessons = [
  { id: 1, title: 'Урок 1', progress: 0 },
  { id: 2, title: 'Урок 2', progress: 0 },
  { id: 3, title: 'Урок 3', progress: 0 },
  { id: 4, title: 'Урок 4', progress: 0 },
  { id: 5, title: 'Урок 5', progress: 0 },
];

export default function LessonSelectScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Уроки</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Описание</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {lessons.map((lesson) => (
          <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDescription}>Тренировка слуха</Text>
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
  infoButton: {
    padding: spacing.sm,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  infoButtonText: {
    color: colors.background,
    ...typography.button,
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
    fontWeight: 'bold',
  },
}); 