import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
  useTheme,
  ActivityIndicator,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LESSONS_COUNT, TASKS_PER_LESSON } from '../../data/intonationData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function IntonationLessonsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const lessons = useMemo(() => Array.from({ length: LESSONS_COUNT }, (_, i) => i + 1), []);
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
        for (const lessonId of lessons) {
          const key = `@intonationProgress_${lessonId}`;
          const raw = await AsyncStorage.getItem(key);
          if (!raw) {
            progressData[lessonId] = { currentTaskIndex: 0, score: 0, completed: false };
          } else {
            progressData[lessonId] = JSON.parse(raw);
          }
        }
        setLessonProgress(progressData);
        setIsLoadingProgress(false);
      };
      loadProgress();
    }, [lessons]),
  );

  if (isLoadingProgress) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader
        title="Уроки интонации"
        subtitle={`${LESSONS_COUNT} уроков по ${TASKS_PER_LESSON} заданий`}
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {lessons.map((lessonId) => {
          const progress = lessonProgress[lessonId] || { currentTaskIndex: 0, score: 0, completed: false };
          const pct = progress.completed ? 1 : progress.currentTaskIndex / (TASKS_PER_LESSON - 1);
          const percentLabel = Math.round(pct * 100);

          return (
          <TouchableOpacity
            key={lessonId}
            activeOpacity={0.85}
            onPress={async () => {
              const progress = lessonProgress[lessonId] || { currentTaskIndex: 0, score: 0, completed: false };
              if (!progress.completed) {
                navigation.navigate('IntonationLesson', { lessonId });
                return;
              }

              setReplayDialog({ visible: true, lessonId, score: progress.score });
            }}
          >
            <Card style={[styles.card, shadows.soft]} mode="elevated">
              <Card.Title
                title={`Урок ${lessonId}`}
                subtitle={`${percentLabel}% пройдено`}
                left={() => (
                  <View style={[styles.iconBox, { backgroundColor: theme.colors.secondaryContainer }]}>
                    <MaterialCommunityIcons name="waveform" size={22} color={theme.colors.secondary} />
                  </View>
                )}
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
                navigation.navigate('IntonationLessonResult', {
                  lessonId: replayDialog.lessonId,
                  score: replayDialog.score,
                });
              }}
            >
              Посмотреть результат
            </Button>
            <Button
              mode="contained"
              buttonColor={theme.colors.error}
              textColor="#fff"
              onPress={async () => {
                const lessonId = replayDialog.lessonId;
                await AsyncStorage.removeItem(`@intonationProgress_${lessonId}`);
                setReplayDialog((d) => ({ ...d, visible: false }));
                navigation.navigate('IntonationLesson', { lessonId });
              }}
            >
              Пройти ещё раз
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.md },
  card: { borderRadius: radii.lg },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  bar: { height: 6, borderRadius: 3 },
});
