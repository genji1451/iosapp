import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, ProgressBar, ActivityIndicator, useTheme } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getIntonationLessonTasks, TASKS_PER_LESSON } from '../../data/intonationData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'IntonationLesson'>;

export default function IntonationLessonScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { lessonId } = route.params;
  const theme = useTheme();

  const tasks = useMemo(() => getIntonationLessonTasks(lessonId), [lessonId]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoadingSound, setIsLoadingSound] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [loaded, setLoaded] = useState(false);

  const progressKey = `@intonationProgress_${lessonId}`;
  const currentTask = tasks[currentTaskIndex];

  useEffect(() => {
    const load = async () => {
      setLoaded(false);
      const raw = await AsyncStorage.getItem(progressKey);
      if (raw) {
        const p = JSON.parse(raw) as { currentTaskIndex: number; score: number; completed: boolean };
        if (p.completed) {
          Alert.alert('Урок уже пройден', 'Пройти ещё раз?', [
            {
              text: 'Посмотреть результат',
              onPress: () => navigation.navigate('IntonationLessonResult', { lessonId, score: p.score }),
            },
            {
              text: 'Пройти ещё раз',
              style: 'destructive',
              onPress: async () => {
                await AsyncStorage.removeItem(progressKey);
                setCurrentTaskIndex(0);
                setScore(0);
              },
            },
          ]);
          setCurrentTaskIndex(Math.min(p.currentTaskIndex ?? 0, TASKS_PER_LESSON - 1));
          setScore(p.score ?? 0);
        } else {
          setCurrentTaskIndex(p.currentTaskIndex ?? 0);
          setScore(p.score ?? 0);
        }
      }
      setLoaded(true);
    };
    load();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [lessonId]);

  useEffect(() => {
    if (!loaded) return;
    if (currentTaskIndex >= TASKS_PER_LESSON) return;

    const save = async () => {
      await AsyncStorage.setItem(progressKey, JSON.stringify({ currentTaskIndex, score, completed: false }));
    };
    save();
  }, [currentTaskIndex, score, loaded, lessonId]);

  const playSound = async () => {
    if (!currentTask) return;
    setIsLoadingSound(true);
    try {
      if (sound) await sound.unloadAsync();
      const { sound: s } = await Audio.Sound.createAsync(currentTask.audioFile);
      setSound(s);
      await s.playAsync();
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось воспроизвести аудио');
    } finally {
      setIsLoadingSound(false);
    }
  };

  const handleAnswer = async (optionIndex: number) => {
    const isCorrect = optionIndex === currentTask.correctIndex;
    const nextScore = isCorrect ? score + 1 : score;

    if (currentTaskIndex < tasks.length - 1) {
      setScore(nextScore);
      setCurrentTaskIndex((i) => i + 1);
      return;
    }

    await AsyncStorage.setItem(progressKey, JSON.stringify({ currentTaskIndex: TASKS_PER_LESSON, score: nextScore, completed: true }));
    navigation.navigate('IntonationLessonResult', { lessonId, score: nextScore });
  };

  if (!loaded || !currentTask) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title={`Интонация: урок ${lessonId}`} subtitle={`Задание ${currentTaskIndex + 1} из ${tasks.length}`} onBack={() => navigation.goBack()} />
      <View style={styles.progressWrap}>
        <ProgressBar progress={(currentTaskIndex + 1) / tasks.length} color={theme.colors.primary} style={styles.progressBar} />
      </View>

      <View style={styles.content}>
        <Card style={[styles.playCard, shadows.card]} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={{ textAlign: 'center', marginBottom: spacing.sm }}>
              Прослушайте интонацию
            </Text>
            <Button mode="contained" icon="play-circle" onPress={playSound} loading={isLoadingSound} style={styles.playBtn}>
              Воспроизвести
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.options}>
          {currentTask.options.map((opt, idx) => (
            <Card key={`${currentTask.audioId}-${idx}`} mode="outlined" style={styles.optionCard} onPress={() => handleAnswer(idx)}>
              <Card.Content>
                <Text variant="bodyLarge" style={{ textAlign: 'center' }}>{opt}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  progressWrap: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  progressBar: { height: 8, borderRadius: radii.sm },
  content: { flex: 1, padding: spacing.md },
  playCard: { borderRadius: radii.lg, marginBottom: spacing.lg },
  playBtn: { borderRadius: radii.md },
  options: { gap: spacing.sm },
  optionCard: { borderRadius: radii.md },
});
