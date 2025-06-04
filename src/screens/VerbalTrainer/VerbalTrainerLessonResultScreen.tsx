import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'VerbalTrainerLessonResult'>;

export default function VerbalTrainerLessonResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { score, lessonId } = route.params;

  const handleStartOver = async () => {
    try {
      // Clear the progress for this lesson
      const progressKey = `@verbalTrainerProgress_${lessonId}`;
      await AsyncStorage.removeItem(progressKey);
      // Navigate back to the lesson
      navigation.navigate('VerbalTrainerLesson', { lessonId: lessonId });
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Урок завершен!</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Правильных ответов:</Text>
          <Text style={styles.score}>{score} из 15</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleStartOver}
        >
          <Text style={styles.buttonText}>Пройти заново</Text>
        </TouchableOpacity>

         <TouchableOpacity
          style={[styles.button, styles.backButtonLessonList]}
          onPress={() => navigation.navigate('VerbalTrainerLessons')}
        >
          <Text style={styles.buttonText}>Вернуться к урокам</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  scoreLabel: {
    ...typography.body,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  score: {
    ...typography.h2,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    width: 200,
    marginBottom: spacing.md, // Добавим отступ между кнопками
  },
  buttonText: {
    ...typography.button,
    color: colors.background,
  },
  backButtonLessonList: {
     backgroundColor: colors.textLight, // Другой цвет для кнопки назад
  }
}); 