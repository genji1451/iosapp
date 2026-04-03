import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  Card,
  ProgressBar,
  ActivityIndicator,
  useTheme,
  FAB,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const lessons = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Урок ${i + 1}` }));

const TOTAL_TASKS = 20;

export default function VerbalTrainerLessonsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [lessonProgress, setLessonProgress] = useState<
    Record<number, { currentTaskIndex: number; score: number; completed: boolean }>
  >({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [replayDialog, setReplayDialog] = useState<{
    visible: boolean;
    lessonId: number;
    score: number;
  }>({ visible: false, lessonId: 0, score: 0 });

  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        setIsLoadingProgress(true);
        const progressData: Record<number, { currentTaskIndex: number; score: number; completed: boolean }> = {};
        for (const lesson of lessons) {
          const progressKey = `@verbalTrainerProgress_${lesson.id}`;
          try {
            const savedProgress = await AsyncStorage.getItem(progressKey);
            if (savedProgress !== null) {
              progressData[lesson.id] = JSON.parse(savedProgress);
            } else {
              progressData[lesson.id] = { currentTaskIndex: 0, score: 0, completed: false };
            }
          } catch (error) {
            console.error(`Failed to load progress for lesson ${lesson.id}`, error);
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
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyLarge" style={{ marginTop: spacing.md }}>
          Загрузка прогресса...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="Уроки" subtitle="Вербальный тренажёр" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.md }}>
          Выберите урок. Прогресс сохраняется автоматически.
        </Text>

        {lessons.map((lesson) => {
          const progress = lessonProgress[lesson.id] || { currentTaskIndex: 0, score: 0, completed: false };
          // Показываем 100% только когда урок реально завершен (completed=true)
          const pct = progress.completed ? 1 : progress.currentTaskIndex / (TOTAL_TASKS - 1);
          const percentLabel = Math.round(pct * 100);

          return (
            <TouchableOpacity
              key={lesson.id}
              activeOpacity={0.85}
              onPress={() => {
                const progress =
                  lessonProgress[lesson.id] ||
                  ({ currentTaskIndex: 0, score: 0, completed: false } as {
                    currentTaskIndex: number;
                    score: number;
                    completed: boolean;
                  });

                const isCompleted = progress.completed;

                if (!isCompleted) {
                  navigation.navigate('VerbalTrainerLesson', { lessonId: lesson.id });
                  return;
                }

                const progressKey = `@verbalTrainerProgress_${lesson.id}`;

                setReplayDialog({ visible: true, lessonId: lesson.id, score: progress.score });
              }}
            >
              <Card style={[styles.card, shadows.soft]} mode="elevated">
              <Card.Title
                title={lesson.title}
                subtitle={`${percentLabel}% пройдено`}
                left={() => (
                  <View style={[styles.lessonIcon, { backgroundColor: theme.colors.primaryContainer }]}>
                    <MaterialCommunityIcons name="headphones" size={22} color={theme.colors.primary} />
                  </View>
                )}
                right={() => <MaterialCommunityIcons name="chevron-right" size={22} color={theme.colors.onSurfaceVariant} />}
              />
              <Card.Content style={{ paddingTop: 0 }}>
                <ProgressBar progress={pct} color={theme.colors.primary} style={styles.bar} />
              </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Portal>
        <Dialog
          visible={replayDialog.visible}
          onDismiss={() => setReplayDialog((d) => ({ ...d, visible: false }))}
          style={{ borderRadius: radii.md }}
        >
          <Dialog.Title>Урок уже пройден</Dialog.Title>
          <Dialog.Content>
            <Text>Пройти ещё раз?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setReplayDialog((d) => ({ ...d, visible: false }));
                navigation.navigate('VerbalTrainerLessonResult', {
                  score: replayDialog.score,
                  lessonId: replayDialog.lessonId,
                });
              }}
            >
              Посмотреть результат
            </Button>
            <Button
              onPress={async () => {
                const progressKey = `@verbalTrainerProgress_${replayDialog.lessonId}`;
                setReplayDialog((d) => ({ ...d, visible: false }));
                await AsyncStorage.removeItem(progressKey);
                navigation.navigate('VerbalTrainerLesson', { lessonId: replayDialog.lessonId });
              }}
              mode="contained"
              buttonColor={theme.colors.error}
              textColor="#fff"
            >
              Пройти ещё раз
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="information"
        style={[styles.fab, { backgroundColor: theme.colors.secondary }]}
        onPress={() =>
          Alert.alert(
            'Как проходить урок',
            'Нажмите «Воспроизвести», внимательно прослушайте слово и выберите один из четырёх вариантов.'
          )
        }
        label="Подсказка"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: spacing.md, paddingBottom: 100, gap: spacing.md },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { borderRadius: radii.lg },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  bar: { height: 6, borderRadius: 3 },
  fab: { position: 'absolute', right: spacing.md, bottom: spacing.lg },
});
