import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';

const answers = [
  { id: 1, text: 'Первый вариант ответа' },
  { id: 2, text: 'Второй вариант ответа' },
  { id: 3, text: 'Третий вариант ответа' },
  { id: 4, text: 'Четвертый вариант ответа' },
];

export default function TestScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Описание</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>
          Какой из предложенных вариантов лучше всего описывает услышанный звук?
        </Text>

        {answers.map((answer) => (
          <TouchableOpacity key={answer.id} style={styles.answerButton}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
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
    padding: spacing.md,
  },
  backButton: {
    fontSize: 24,
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
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  question: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    opacity: 0,
  },
  answerText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
}); 