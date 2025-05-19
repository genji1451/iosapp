import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../../theme';

const answers = [
  { id: 1, text: 'Вариант 1' },
  { id: 2, text: 'Вариант 2' },
  { id: 3, text: 'Вариант 3' },
  { id: 4, text: 'Вариант 4' },
  { id: 5, text: 'Вариант 5' },
  { id: 6, text: 'Вариант 6' },
];

export default function LessonScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressText}>1/10</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.speakerButton}>
          <Text style={styles.speakerIcon}>🔊</Text>
        </TouchableOpacity>

        <View style={styles.grid}>
          {answers.map((answer) => (
            <TouchableOpacity key={answer.id} style={styles.answerButton}>
              <Text style={styles.answerText}>{answer.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    padding: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  progressFill: {
    width: '10%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  speakerButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  speakerIcon: {
    fontSize: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  answerButton: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText: {
    ...typography.button,
    color: colors.text,
  },
}); 