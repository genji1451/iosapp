import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows } from '../../theme';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, ProgressBar, ActivityIndicator, useTheme } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import { lessonData } from './VerbalTrainerLessonScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Task = {
  id: number;
  audio: any;
  options: string[];
  correctAnswer: string;
};

const TOTAL_CONTROL_TASKS = 50;

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function VerbalTrainerControlScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isLoadingSound, setIsLoadingSound] = useState(false);

  const controlTasks = useMemo(() => {
    const flattened = lessonData.flat() as Task[];
    const shuffled = shuffleArray(flattened);
    return shuffled.slice(0, Math.min(TOTAL_CONTROL_TASKS, shuffled.length));
  }, []);

  const currentTask = controlTasks[currentTaskIndex];
  const shuffledOptions = useMemo(
    () => (currentTask ? shuffleArray(currentTask.options) : []),
    [currentTaskIndex, currentTask],
  );

  const playSound = async () => {
    if (!currentTask) return;
    setIsLoadingSound(true);
    try {
      if (sound) await sound.unloadAsync();
      const { sound: created } = await Audio.Sound.createAsync(currentTask.audio);
      setSound(created);
      await created.playAsync();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось воспроизвести аудио');
    } finally {
      setIsLoadingSound(false);
    }
  };

  const handleAnswer = (selected: string) => {
    if (!currentTask) return;
    const isCorrect = selected === currentTask.correctAnswer;
    const nextScore = isCorrect ? score + 1 : score;

    if (currentTaskIndex < controlTasks.length - 1) {
      setScore(nextScore);
      setCurrentTaskIndex((i) => i + 1);
      return;
    }

    navigation.replace('VerbalTrainerControlResult', {
      score: nextScore,
      total: controlTasks.length,
    });
  };

  if (!currentTask) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader
        title="Контрольное задание"
        subtitle={`Вопрос ${currentTaskIndex + 1} из ${controlTasks.length}`}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.progressWrap}>
        <ProgressBar progress={(currentTaskIndex + 1) / controlTasks.length} color={theme.colors.primary} style={styles.progressBar} />
      </View>

      <View style={styles.content}>
        <Card style={[styles.playCard, shadows.card]} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={{ textAlign: 'center', marginBottom: spacing.sm }}>
              Прослушайте слово
            </Text>
            <Button mode="contained" icon="play-circle" onPress={playSound} loading={isLoadingSound} style={styles.playBtn}>
              Воспроизвести
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.options}>
          {shuffledOptions.map((opt, idx) => (
            <Card key={`${currentTask.id}-${idx}`} mode="outlined" style={styles.optionCard} onPress={() => handleAnswer(opt)}>
              <Card.Content>
                <Text variant="titleMedium" style={{ textAlign: 'center' }}>{opt}</Text>
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
