import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../../theme';

const modes = [
  { id: 1, title: 'Слова' },
  { id: 2, title: 'Фразы' },
  { id: 3, title: 'Диалоги' },
  { id: 4, title: 'Грамматика' },
  { id: 5, title: 'Тесты' },
  { id: 6, title: 'Практика' },
];

export default function ModeSelectScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Я-СЛЫШУ</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoButtonText}>Описание</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {modes.map((mode) => (
            <TouchableOpacity key={mode.id} style={styles.modeButton}>
              <Text style={styles.modeButtonText}>{mode.title}</Text>
            </TouchableOpacity>
          ))}
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
  scrollView: {
    flex: 1,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  modeButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  modeButtonText: {
    color: colors.background,
    ...typography.button,
  },
}); 