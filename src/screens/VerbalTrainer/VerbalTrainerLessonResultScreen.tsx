import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'VerbalTrainerLessonResult'>;

export default function VerbalTrainerLessonResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();
  const { score, lessonId } = route.params;

  const handleStartOver = async () => {
    try {
      const progressKey = `@verbalTrainerProgress_${lessonId}`;
      await AsyncStorage.removeItem(progressKey);
      navigation.navigate('VerbalTrainerLesson', { lessonId: lessonId });
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  };

  const ratio = score / 20;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.hero}>
        <Text variant="headlineSmall" style={styles.heroTitle}>
          Урок завершён
        </Text>
        <Text variant="bodyLarge" style={styles.heroSub}>
          Отличная работа. Сравните результат с прошлыми попытками.
        </Text>
      </LinearGradient>

      <View style={styles.body}>
        <Card style={[styles.scoreCard, shadows.card]} mode="elevated">
          <Card.Content style={styles.scoreInner}>
            <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
              Правильных ответов
            </Text>
            <Text variant="displaySmall" style={{ color: theme.colors.primary, marginVertical: spacing.sm }}>
              {score} / 20
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
              {ratio >= 0.85
                ? 'Превосходный результат'
                : ratio >= 0.6
                  ? 'Хороший темп — продолжайте'
                  : 'Повторите урок для закрепления'}
            </Text>
          </Card.Content>
        </Card>

        <Button mode="contained" icon="refresh" onPress={handleStartOver} style={styles.btn}>
          Пройти заново
        </Button>
        <Button
          mode="outlined"
          icon="view-list"
          onPress={() => navigation.navigate('VerbalTrainerLessons')}
          style={styles.btn}
        >
          К списку уроков
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  hero: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: { color: '#fff', fontWeight: '700' },
  heroSub: { color: 'rgba(255,255,255,0.92)', marginTop: spacing.sm },
  body: { padding: spacing.md, marginTop: -spacing.xl, gap: spacing.md },
  scoreCard: { borderRadius: radii.xl },
  scoreInner: { alignItems: 'center' },
  btn: { borderRadius: radii.md },
});
