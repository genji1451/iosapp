import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const modes = [
  { id: 1, title: 'Слова', icon: '📝' },
  { id: 2, title: 'Фразы', icon: '💬' },
  { id: 3, title: 'Диалоги', icon: '👥' },
  { id: 4, title: 'Грамматика', icon: '📚' },
  { id: 5, title: 'Тесты', icon: '🧠', onPress: 'TestMenu' },
  { id: 6, title: 'Практика', icon: '🎯' },
];

export default function ModeSelectScreen() {
  const navigation = useNavigation<NavigationProp>();

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
            <TouchableOpacity
              key={mode.id}
              style={styles.modeButton}
              onPress={() => {
                if (mode.onPress) {
                  navigation.navigate(mode.onPress as any);
                }
              }}
            >
              <Text style={styles.modeIcon}>{mode.icon}</Text>
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
  modeIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  modeButtonText: {
    color: colors.background,
    ...typography.button,
  },
}); 