import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, ProgressBar, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const lessons = [
  {
    id: 1,
    title: 'Вербальный тренажёр',
    desc: 'Распознавание слов на слух',
    progress: 0.35,
    icon: 'ear-hearing' as const,
    isVerbal: true,
  },
  {
    id: 2,
    title: 'Интонационный тренажёр',
    desc: 'Мелодика и ударение',
    progress: 0,
    icon: 'waveform' as const,
    isIntonation: true,
  },
];

export default function LessonSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: theme.colors.onBackground }}>
          Тренажёры
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Выберите модуль и продолжите с места остановки
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {lessons.map((lesson) => (
          <Card key={lesson.id} style={[styles.card, shadows.soft]} mode="elevated">
            <Card.Content>
              <View style={styles.rowTop}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryContainer }]}>
                  <MaterialCommunityIcons name={lesson.icon} size={28} color={theme.colors.primary} />
                </View>
                <View style={styles.meta}>
                  <Text variant="titleMedium">{lesson.title}</Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    {lesson.desc}
                  </Text>
                </View>
              </View>
              <View style={styles.progressBlock}>
                <View style={styles.progressLabels}>
                  <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    Прогресс
                  </Text>
                  <Text variant="labelMedium" style={{ color: theme.colors.primary }}>
                    {Math.round(lesson.progress * 100)}%
                  </Text>
                </View>
                <ProgressBar progress={lesson.progress} color={theme.colors.primary} style={styles.bar} />
              </View>
              <Button
                mode="contained-tonal"
                icon="arrow-right"
                onPress={() => {
                  if (lesson.isVerbal) navigation.navigate('VerbalTrainerMenu');
                  else if (lesson.isIntonation) navigation.navigate('IntonationTrainerMenu');
                }}
                style={styles.action}
              >
                Открыть
              </Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.md, gap: spacing.xs },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.md },
  card: { borderRadius: radii.lg },
  rowTop: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flex: 1 },
  progressBlock: { marginBottom: spacing.md },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  bar: { height: 8, borderRadius: 4 },
  action: { borderRadius: radii.md },
});
