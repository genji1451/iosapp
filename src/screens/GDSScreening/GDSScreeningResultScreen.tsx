import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows, colors as appColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'GDSScreeningResult'>;

export default function GDSScreeningResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();
  const { score, hasDepression } = route.params;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <LinearGradient colors={[appColors.gradientStart, appColors.gradientEnd]} style={styles.hero}>
        <MaterialCommunityIcons name={hasDepression ? 'alert-circle-outline' : 'check-decagram'} size={48} color="#fff" />
        <Text variant="headlineSmall" style={styles.heroTitle}>
          Результаты скрининга
        </Text>
        <Text variant="displaySmall" style={styles.score}>
          {score} баллов
        </Text>
      </LinearGradient>

      <View style={styles.body}>
        <Card style={[styles.card, shadows.soft]} mode="elevated">
          <Card.Content>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurface, lineHeight: 24 }}>
              {hasDepression
                ? 'По результатам скрининга возможны признаки депрессии. Рекомендуем обсудить это со специалистом.'
                : 'Признаки депрессии по этому опроснику не выявлены. Можно продолжать тренировки.'}
            </Text>
          </Card.Content>
        </Card>

        <Button mode="contained" icon="home" onPress={() => navigation.navigate('MainTabs', { screen: 'ModeSelect' })} style={styles.btn}>
          На главную
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  hero: {
    padding: spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    gap: spacing.sm,
  },
  heroTitle: { color: '#fff', fontWeight: '700' },
  score: { color: '#fff', fontWeight: '800' },
  body: { padding: spacing.md, marginTop: -spacing.lg, gap: spacing.md },
  card: { borderRadius: radii.lg },
  btn: { borderRadius: radii.lg },
});
