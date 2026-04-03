import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, ProgressBar, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < gdsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore(newAnswers);
      const hasDepression = score >= 5;
      navigation.navigate('GDSScreeningResult', { score, hasDepression });
    }
  };

  const calculateScore = (ans: number[]): number => {
    const positiveQuestions = [0, 4, 6, 10, 12];
    return ans.reduce((s, answer, index) => {
      if (positiveQuestions.includes(index)) {
        return s + (answer === 0 ? 1 : 0);
      }
      return s + (answer === 1 ? 1 : 0);
    }, 0);
  };

  const progress = (currentQuestion + 1) / gdsQuestions.length;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.top, { borderBottomColor: theme.colors.outlineVariant }]}>
        <View style={styles.topRow}>
          <MaterialCommunityIcons name="clipboard-pulse" size={28} color={theme.colors.primary} />
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge">GDS-15 скрининг</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Вопрос {currentQuestion + 1} из {gdsQuestions.length}
            </Text>
          </View>
        </View>
        <ProgressBar progress={progress} style={styles.bar} color={theme.colors.primary} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={[styles.card, shadows.soft]} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={{ lineHeight: 26 }}>
              {gdsQuestions[currentQuestion]}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.row}>
          <Button mode="contained" icon="thumb-up-outline" onPress={() => handleAnswer(1)} style={styles.half}>
            Да
          </Button>
          <Button mode="contained-tonal" icon="thumb-down-outline" onPress={() => handleAnswer(0)} style={styles.half}>
            Нет
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  top: { padding: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  bar: { height: 8, borderRadius: radii.sm },
  scroll: { padding: spacing.md, gap: spacing.lg, paddingBottom: spacing.xxl },
  card: { borderRadius: radii.lg },
  row: { flexDirection: 'row', gap: spacing.md },
  half: { flex: 1, borderRadius: radii.md },
});
