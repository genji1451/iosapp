import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Clipboard } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestTabParamList } from '../../navigation/TestTabNavigator';
import { spacing, radii, shadows, colors as appColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as MailComposer from 'expo-mail-composer';
import { BackHeader } from '../../components/ui/BackHeader';

type NavigationProp = NativeStackNavigationProp<TestTabParamList>;
type TestResultRouteProp = RouteProp<TestTabParamList, 'TestResult'>;

export default function TestResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TestResultRouteProp>();
  const theme = useTheme();
  const { score } = route.params;

  const getInterpretation = (s: number) => {
    if (s <= 5) return 'Нормальное состояние';
    if (s <= 9) return 'Легкая депрессия';
    if (s <= 11) return 'Умеренная депрессия';
    return 'Тяжелая депрессия';
  };

  const handleSendEmail = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Почтовый сервис недоступен', 'Скопировать результаты в буфер обмена?', [
          { text: 'Отмена', style: 'cancel' },
          { text: 'Скопировать', onPress: handleCopyToClipboard },
        ]);
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
      Alert.alert('Ошибка отправки', 'Скопировать результаты в буфер обмена?', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Скопировать', onPress: handleCopyToClipboard },
      ]);
    }
  };

  const handleCopyToClipboard = () => {
    const resultText = `Результаты теста GDS-15:\n\nБалл: ${score} из 15\nИнтерпретация: ${getInterpretation(score)}`;
    Clipboard.setString(resultText);
    Alert.alert('Скопировано', 'Результаты скопированы в буфер обмена');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="Результаты GDS-15" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[appColors.gradientStart, appColors.gradientEnd]} style={styles.hero}>
          <Text variant="displayMedium" style={styles.bigScore}>
            {score}
          </Text>
          <Text variant="titleMedium" style={styles.sub}>
            из 15 баллов
          </Text>
        </LinearGradient>

        <Card style={[styles.card, shadows.soft]} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={{ textAlign: 'center', color: theme.colors.onSurface }}>
              {getInterpretation(score)}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.md }}>
              Интерпретация ориентировочная. Обсудите результат со специалистом при необходимости.
            </Text>
          </Card.Content>
        </Card>

        <Button mode="contained" icon="email-send-outline" onPress={handleSendEmail} style={styles.btn}>
          Отправить результаты
        </Button>
        <Button mode="outlined" icon="clipboard-text-outline" onPress={handleCopyToClipboard} style={styles.btn}>
          Скопировать текст
        </Button>
        <Button mode="text" onPress={() => navigation.navigate('TestMenu')}>
          Вернуться к тестам
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.md },
  hero: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bigScore: { color: '#fff', fontWeight: '800' },
  sub: { color: 'rgba(255,255,255,0.9)' },
  card: { borderRadius: radii.lg },
  btn: { borderRadius: radii.md },
});
