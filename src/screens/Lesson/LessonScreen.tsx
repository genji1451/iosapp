import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';

const answers = [
  { id: 1, text: 'Вариант 1' },
  { id: 2, text: 'Вариант 2' },
  { id: 3, text: 'Вариант 3' },
  { id: 4, text: 'Вариант 4' },
  { id: 5, text: 'Вариант 5' },
  { id: 6, text: 'Вариант 6' },
];

export default function LessonScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentExercise = 3;
  const totalExercises = 5;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Упражнение {currentExercise} из {totalExercises}
        </Text>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Описание</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, styles.completed]} />
        <View style={[styles.statusIndicator, styles.completed]} />
        <View style={[styles.statusIndicator, styles.current]} />
        <View style={[styles.statusIndicator, styles.pending]} />
        <View style={[styles.statusIndicator, styles.pending]} />
      </View>

      <View style={styles.playButtonContainer}>
        <TouchableOpacity
          style={[styles.playButton, isPlaying && styles.playingButton]}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? '⏸' : '▶️'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.answersGrid}>
        {answers.map((answer) => (
          <TouchableOpacity key={answer.id} style={styles.answerButton}>
            <Text style={styles.answerText}>{answer.text}</Text>
          </TouchableOpacity>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  progress: {
    ...typography.h2,
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
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  completed: {
    backgroundColor: colors.success,
  },
  current: {
    backgroundColor: colors.primary,
  },
  pending: {
    backgroundColor: colors.border,
  },
  playButtonContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playingButton: {
    backgroundColor: colors.secondary,
  },
  playButtonText: {
    fontSize: 32,
  },
  answersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  answerButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  answerText: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    padding: spacing.md,
  },
}); 