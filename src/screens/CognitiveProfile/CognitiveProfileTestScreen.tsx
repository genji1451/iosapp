import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestTabParamList } from '../../navigation/TestTabNavigator';
import { spacing, radii } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, ProgressBar, Card, useTheme } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import { cognitiveQuestions, CognitiveDomain } from '../../utils/cognitiveProfileData';

type NavigationProp = NativeStackNavigationProp<TestTabParamList>;

type DomainScores = Record<CognitiveDomain, number>;

export default function CognitiveProfileTestScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [domainScores, setDomainScores] = useState<DomainScores>({
    memory: 0,
    attention: 0,
    executive: 0,
    language: 0,
  });

  const question = cognitiveQuestions[currentQuestion];
  const options = useMemo(() => question.options, [question]);

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === question.correctAnswer;
    const nextScore = isCorrect ? score + 1 : score;
    const nextDomainScores = { ...domainScores };

    if (isCorrect) {
      nextDomainScores[question.domain] += 1;
    }

    if (currentQuestion < cognitiveQuestions.length - 1) {
      setScore(nextScore);
      setDomainScores(nextDomainScores);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      navigation.navigate('CognitiveProfileResult', {
        score: nextScore,
        total: cognitiveQuestions.length,
        domainScores: nextDomainScores,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader
        title="Когнитивный профиль"
        subtitle={`Вопрос ${currentQuestion + 1} из ${cognitiveQuestions.length}`}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.progressWrap}>
        <ProgressBar progress={(currentQuestion + 1) / cognitiveQuestions.length} color={theme.colors.primary} style={styles.bar} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Card style={{ borderRadius: radii.lg }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ textAlign: 'center', lineHeight: 26, color: theme.colors.onSurface }}>
              {question.text}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.actions}>
          {options.map((option) => (
            <Button key={option} mode="outlined" onPress={() => handleAnswer(option)} style={styles.btn}>
              {option}
            </Button>
          ))}
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
  actions: { gap: spacing.sm, marginTop: spacing.md },
  btn: { borderRadius: radii.md },
});
