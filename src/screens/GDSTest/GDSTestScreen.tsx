import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/Button';
import { gdsQuestions } from '../../utils/gdsData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function GDSTestScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: boolean) => {
    const userAnswer = answer ? 'Да' : 'Нет';
    const newAnswers = [...answers, userAnswer];
    setAnswers(newAnswers);

    // Сверяем с правильным ответом
    const correct = userAnswer === gdsQuestions[currentQuestion].correctAnswer;
    const newScore = correct ? score + 1 : score;
    setScore(newScore);

    if (currentQuestion < gdsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate('TestResult', { score: newScore });
    }
  };

  const progress = ((currentQuestion + 1) / gdsQuestions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>GDS-15</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
          <Text style={styles.progressText}>
            Вопрос {currentQuestion + 1} из {gdsQuestions.length}
          </Text>
        </View>

        <ScrollView style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {gdsQuestions[currentQuestion].text}
          </Text>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <Button
            title="Да"
            onPress={() => handleAnswer(true)}
            style={styles.yesButton}
          />
          <Button
            title="Нет"
            onPress={() => handleAnswer(false)}
            style={styles.noButton}
          />
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
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  questionContainer: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  questionText: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: spacing.md,
  },
  yesButton: {
    backgroundColor: colors.success,
  } as ViewStyle,
  noButton: {
    backgroundColor: colors.error,
  } as ViewStyle,
}); 