import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestTabParamList } from '../../navigation/TestTabNavigator';
import { spacing, radii } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, ProgressBar, Card, useTheme } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import { gdsQuestions } from '../../utils/gdsData';

type NavigationProp = NativeStackNavigationProp<TestTabParamList>;

export default function GDSTestScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: boolean) => {
    const userAnswer = answer ? 'Да' : 'Нет';
    const newAnswers = [...answers, userAnswer];
    setAnswers(newAnswers);

    const correct = userAnswer === gdsQuestions[currentQuestion].correctAnswer;
    const newScore = correct ? score + 1 : score;
    setScore(newScore);

    if (currentQuestion < gdsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate('TestResult', { score: newScore });
    }
  };

  const progress = (currentQuestion + 1) / gdsQuestions.length;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="GDS-15" subtitle={`Вопрос ${currentQuestion + 1} из ${gdsQuestions.length}`} onBack={() => navigation.goBack()} />

      <View style={styles.progressWrap}>
        <ProgressBar progress={progress} color={theme.colors.primary} style={styles.bar} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Card style={{ borderRadius: radii.lg }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ textAlign: 'center', lineHeight: 26, color: theme.colors.onSurface }}>
              {gdsQuestions[currentQuestion].text}
            </Text>
          </Card.Content>
        </Card>

        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginVertical: spacing.md }}>
          Отвечайте честно — от этого зависит точность интерпретации.
        </Text>

        <View style={styles.actions}>
          <Button mode="contained" buttonColor={theme.colors.tertiary} icon="check" onPress={() => handleAnswer(true)} style={styles.btn}>
            Да
          </Button>
          <Button mode="contained" buttonColor={theme.colors.error} icon="close" onPress={() => handleAnswer(false)} style={styles.btn}>
            Нет
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  progressWrap: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  bar: { height: 8, borderRadius: radii.sm },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.md, flexGrow: 1 },
  actions: { gap: spacing.md, marginTop: 'auto' },
  btn: { borderRadius: radii.md, paddingVertical: spacing.xs },
});
