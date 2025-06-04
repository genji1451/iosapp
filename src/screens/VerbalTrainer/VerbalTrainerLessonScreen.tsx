import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'VerbalTrainerLesson'>;

// Заглушка данных для уроков (в реальном приложении данные будут подгружаться)
const lessonData = [
  // Урок 1
  [
    { id: 1, audio: require('../../../assets/audio/audio_url_1.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 2, audio: require('../../../assets/audio/audio_url_2.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 3, audio: require('../../../assets/audio/audio_url_3.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 4, audio: require('../../../assets/audio/audio_url_4.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 5, audio: require('../../../assets/audio/audio_url_5.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 6, audio: require('../../../assets/audio/audio_url_6.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 7, audio: require('../../../assets/audio/audio_url_7.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 8, audio: require('../../../assets/audio/audio_url_8.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 9, audio: require('../../../assets/audio/audio_url_9.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 10, audio: require('../../../assets/audio/audio_url_10.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 11, audio: require('../../../assets/audio/audio_url_11.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 12, audio: require('../../../assets/audio/audio_url_12.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 13, audio: require('../../../assets/audio/audio_url_13.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 14, audio: require('../../../assets/audio/audio_url_14.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
    { id: 15, audio: require('../../../assets/audio/audio_url_15.m4a'), options: ['Мама', 'Момо', 'Мамаа', 'Мамо'], correctAnswer: 'Мама' },
  ],
  // Добавьте данные для остальных 5 уроков
];

const TOTAL_TASKS = 15; // Добавим константу для общего количества заданий

export default function VerbalTrainerLessonScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { lessonId } = route.params;
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [isLoadingSound, setIsLoadingSound] = useState(false);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);

  const lessonTasks = lessonData[lessonId - 1]; // Получаем задания для текущего урока
  const currentTask = lessonTasks[currentTaskIndex];
  const progressKey = `@verbalTrainerProgress_${lessonId}`;

  // Загрузка прогресса при фокусировке на экране
  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        try {
          const savedProgress = await AsyncStorage.getItem(progressKey);
          if (savedProgress !== null) {
            const progress = JSON.parse(savedProgress);
            // Если урок был завершен или набран максимальный балл, показываем экран успеха
            if (progress.completed || progress.score === TOTAL_TASKS) {
              navigation.navigate('VerbalTrainerLessonResult', { 
                score: progress.score,
                lessonId: lessonId 
              });
              return;
            }
            // Иначе загружаем сохраненный прогресс
            setCurrentTaskIndex(progress.currentTaskIndex);
            setScore(progress.score);
          } else {
            // Если прогресса нет, сбрасываем состояние
            setCurrentTaskIndex(0);
            setScore(0);
          }
        } catch (error) {
          console.error('Failed to load progress', error);
          // В случае ошибки тоже сбрасываем состояние
          setCurrentTaskIndex(0);
          setScore(0);
        } finally {
          setIsProgressLoaded(true);
        }
      };

      loadProgress();

      return () => {
        // Очистка звука при уходе с экрана
        if (sound) {
          sound.unloadAsync();
          setSound(undefined);
        }
      };
    }, [lessonId, sound])
  );

  // Сохранение прогресса при изменении задания или счета
  useEffect(() => {
     if (!isProgressLoaded || currentTaskIndex === TOTAL_TASKS) return; // Не сохраняем, пока не загрузили начальный прогресс или урок завершен

    const saveProgress = async () => {
      try {
        const progress = {
          currentTaskIndex: currentTaskIndex,
          score: score,
          completed: false, // Урок еще не завершен
        };
        await AsyncStorage.setItem(progressKey, JSON.stringify(progress));
        console.log('Progress saved', progress);
      } catch (error) {
        console.error('Failed to save progress', error);
      }
    };

    saveProgress();

  }, [currentTaskIndex, score, lessonId, isProgressLoaded]);

  async function playSound() {
    if (sound) {
       await sound.unloadAsync();
       setSound(undefined);
    }

    setIsLoadingSound(true);
    console.log('Loading Sound');
    try {
       const { sound } = await Audio.Sound.createAsync(
         currentTask.audio
       );
       setSound(sound);
       console.log('Playing Sound');
       await sound.playAsync();
    } catch (error) {
       console.error('Error playing sound:', error);
       Alert.alert('Ошибка', 'Не удалось загрузить или воспроизвести аудио.');
    } finally {
       setIsLoadingSound(false);
    }
  }

  const handleAnswer = (selectedAnswer: string) => {
    // Сначала увеличиваем счет, если ответ правильный
    if (selectedAnswer === currentTask.correctAnswer) {
      setScore(score + 1);
    }

    // Проверяем, был ли это последний вопрос
    if (currentTaskIndex < lessonTasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      // Урок завершен
      const saveCompletion = async () => {
         try {
            const progress = {
               currentTaskIndex: TOTAL_TASKS,
               score: selectedAnswer === currentTask.correctAnswer ? score + 1 : score, // Учитываем последний ответ
               completed: true,
            };
            await AsyncStorage.setItem(progressKey, JSON.stringify(progress));
            console.log('Lesson completed and progress saved', progress);
         } catch (error) {
            console.error('Failed to save completion status', error);
         }
      };
      saveCompletion();

      // Переходим к экрану результатов с учетом последнего ответа
      navigation.navigate('VerbalTrainerLessonResult', { 
        score: selectedAnswer === currentTask.correctAnswer ? score + 1 : score,
        lessonId: lessonId 
      });
    }
  };

   if (!isProgressLoaded) {
     return (
       <View style={styles.loadingContainer}> 
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Загрузка прогресса...</Text>
       </View>
     );
   }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Урок {lessonId}</Text>
        <Text style={styles.progress}>Задание {currentTaskIndex + 1} из {lessonTasks.length}</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={playSound}
          disabled={isLoadingSound}
        >
          {isLoadingSound ? (
            <ActivityIndicator size="large" color={colors.background} />
          ) : (
            <Text style={styles.playButtonText}>Воспроизвести звук</Text>
          )}
        </TouchableOpacity>

        <View style={styles.optionsContainer}>
          {currentTask.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionButtonText}>{option}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
    marginRight: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginRight: spacing.md,
    fontWeight: 'bold',
  },
  progress: {
    ...typography.body,
    color: colors.textLight,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  playButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
  },
  playButtonText: {
    ...typography.button,
    color: colors.background,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    gap: spacing.md,
  },
  optionButton: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  optionButtonText: {
    ...typography.button,
    color: colors.text,
    fontWeight: 'bold',
  },
  loadingContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: colors.background,
  },
  loadingText: {
     marginTop: spacing.md,
     ...typography.body,
     color: colors.text,
  },
}); 