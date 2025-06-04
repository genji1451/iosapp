import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'GDSScreeningResult'>;

export default function GDSScreeningResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { score, hasDepression } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Результаты скрининга</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Ваш результат:</Text>
          <Text style={styles.score}>{score} баллов</Text>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {hasDepression
              ? 'По результатам скрининга обнаружены признаки депрессии. Рекомендуется обратиться к специалисту для консультации.'
              : 'По результатам скрининга признаки депрессии не обнаружены. Вы можете продолжить работу с приложением.'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!hasDepression) {
              navigation.navigate('MainTabs');
            } else {
              // Здесь можно добавить навигацию к информации о специалистах
              navigation.navigate('MainTabs');
            }
          }}
        >
          <Text style={styles.buttonText}>
            {hasDepression ? 'Понятно' : 'Начать тренировки'}
          </Text>
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
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
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
  resultContainer: {
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  resultText: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.button,
    color: colors.background,
  },
}); 