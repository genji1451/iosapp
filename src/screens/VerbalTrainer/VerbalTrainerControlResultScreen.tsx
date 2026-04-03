import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'VerbalTrainerControlResult'>;

export default function VerbalTrainerControlResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();
  const { score, total } = route.params;
  const ratio = total > 0 ? score / total : 0;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.hero}>
        <Text variant="headlineSmall" style={styles.heroTitle}>Контроль завершён</Text>
        <Text variant="bodyLarge" style={styles.heroSub}>Проверьте итоговый результат</Text>
      </LinearGradient>
      <View style={styles.body}>
        <Card style={[styles.scoreCard, shadows.card]} mode="elevated">
          <Card.Content style={styles.scoreInner}>
            <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>Правильных ответов</Text>
            <Text variant="displaySmall" style={{ color: theme.colors.primary, marginVertical: spacing.sm }}>
              {score} / {total}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
              {ratio >= 0.8 ? 'Отличный результат' : ratio >= 0.6 ? 'Хороший результат' : 'Стоит повторить тренировку'}
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          icon="refresh"
          onPress={() => navigation.replace('VerbalTrainerControl')}
          style={styles.btn}
        >
          Пройти контроль заново
        </Button>
        <Button
          mode="outlined"
          icon="view-list"
          onPress={() => navigation.navigate('VerbalTrainerMenu')}
          style={styles.btn}
        >
          К меню тренажёра
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  hero: { padding: spacing.xl, paddingBottom: spacing.xxl, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  heroTitle: { color: '#fff', fontWeight: '700' },
  heroSub: { color: 'rgba(255,255,255,0.92)', marginTop: spacing.sm },
  body: { padding: spacing.md, marginTop: -spacing.xl, gap: spacing.md },
  scoreCard: { borderRadius: radii.xl },
  scoreInner: { alignItems: 'center' },
  btn: { borderRadius: radii.md },
});
