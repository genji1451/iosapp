import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Clipboard,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import * as MailComposer from 'expo-mail-composer';
import { Button } from '../../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TestResultRouteProp = RouteProp<RootStackParamList, 'TestResult'>;

export default function TestResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TestResultRouteProp>();
  const { score } = route.params;

  const getInterpretation = (score: number) => {
    if (score <= 5) return 'Нормальное состояние';
    if (score <= 9) return 'Легкая депрессия';
    if (score <= 11) return 'Умеренная депрессия';
    return 'Тяжелая депрессия';
  };

  const handleSendEmail = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert(
          'Почтовый сервис недоступен',
          'Хотите скопировать результаты в буфер обмена?',
          [
            {
              text: 'Отмена',
              style: 'cancel',
            },
            {
              text: 'Скопировать',
              onPress: handleCopyToClipboard,
            },
          ]
        );
        return;
      }

      const result = await MailComposer.composeAsync({
        recipients: ['doctor@example.com'],
        subject: 'Результаты теста GDS-15',
        body: `Результаты теста GDS-15:\n\nБалл: ${score} из 15\nИнтерпретация: ${getInterpretation(score)}`,
      });

      if (result.status === 'sent') {
        Alert.alert('Успешно', 'Результаты отправлены');
      } else {
        throw new Error('Email not sent');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      Alert.alert(
        'Ошибка отправки',
        'Не удалось отправить результаты. Хотите скопировать их в буфер обмена?',
        [
          {
            text: 'Отмена',
            style: 'cancel',
          },
          {
            text: 'Скопировать',
            onPress: handleCopyToClipboard,
          },
        ]
      );
    }
  };

  const handleCopyToClipboard = () => {
    const resultText = `Результаты теста GDS-15:\n\nБалл: ${score} из 15\nИнтерпретация: ${getInterpretation(score)}`;
    Clipboard.setString(resultText);
    Alert.alert('Скопировано', 'Результаты скопированы в буфер обмена');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Результаты</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={styles.scoreLabel}>из 15</Text>
        </View>

        <Text style={styles.interpretation}>
          {getInterpretation(score)}
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Отправить результаты"
            onPress={handleSendEmail}
            style={styles.button}
          />
          <Button
            title="Вернуться к тестам"
            onPress={() => navigation.navigate('TestMenu')}
            style={[styles.button, styles.secondaryButton]}
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
    padding: spacing.md,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
    marginRight: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  scoreText: {
    ...typography.h1,
    fontSize: 48,
    color: colors.primary,
  },
  scoreLabel: {
    ...typography.body,
    color: colors.textLight,
  },
  interpretation: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
}); 