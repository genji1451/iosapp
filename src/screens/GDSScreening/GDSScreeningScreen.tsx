import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const gdsQuestions = [
  'Вы удовлетворены своей жизнью?',
  'Вы бросили многие из своих занятий и интересов?',
  'Вы чувствуете, что ваша жизнь пуста?',
  'Вам часто бывает скучно?',
  'Вы надеетесь на хорошее в будущем?',
  'Вас беспокоят мысли, от которых не можете избавиться?',
  'Вы в хорошем настроении большую часть времени?',
  'Вы боитесь, что с вами случится что-то плохое?',
  'Вы чувствуете себя счастливым большую часть времени?',
  'Вы часто чувствуете себя беспомощным?',
  'Вы часто чувствуете себя беспокойным и суетливым?',
  'Вы предпочитаете оставаться дома, а не выходить и делать что-то новое?',
  'Вы беспокоитесь о будущем?',
  'Вы чувствуете, что у вас больше проблем с памятью, чем у большинства людей?',
  'Вы чувствуете, что сейчас жить хорошо?',
];

export default function GDSScreeningScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < gdsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore(newAnswers);
      const hasDepression = score >= 5; // Порог для определения депрессии
      navigation.navigate('GDSScreeningResult', { score, hasDepression });
    }
  };

  const calculateScore = (answers: number[]): number => {
    // Для вопросов 1, 5, 7, 11, 13 ответ "Нет" = 1 балл
    // Для остальных вопросов ответ "Да" = 1 балл
    const positiveQuestions = [0, 4, 6, 10, 12];
    return answers.reduce((score, answer, index) => {
      if (positiveQuestions.includes(index)) {
        return score + (answer === 0 ? 1 : 0);
      }
      return score + (answer === 1 ? 1 : 0);
    }, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GDS-15 Скрининг</Text>
        <Text style={styles.progress}>
          Вопрос {currentQuestion + 1} из {gdsQuestions.length}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{gdsQuestions[currentQuestion]}</Text>
          
          <View style={styles.answersContainer}>
            <TouchableOpacity
              style={styles.answerButton}
              onPress={() => handleAnswer(1)}
            >
              <Text style={styles.answerText}>Да</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.answerButton}
              onPress={() => handleAnswer(0)}
            >
              <Text style={styles.answerText}>Нет</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  progress: {
    ...typography.body,
    color: colors.textLight,
  },
  scrollView: {
    flex: 1,
  },
  questionContainer: {
    padding: spacing.lg,
  },
  question: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  answersContainer: {
    gap: spacing.md,
  },
  answerButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  answerText: {
    ...typography.button,
    color: colors.background,
  },
}); 