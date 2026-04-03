import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestTabParamList } from '../../navigation/TestTabNavigator';
import { spacing, radii, shadows, colors as appColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { domainTitles, CognitiveDomain } from '../../utils/cognitiveProfileData';
import { BackHeader } from '../../components/ui/BackHeader';

type NavigationProp = NativeStackNavigationProp<TestTabParamList>;
type CognitiveResultRouteProp = RouteProp<TestTabParamList, 'CognitiveProfileResult'>;

export default function CognitiveProfileResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CognitiveResultRouteProp>();
  const theme = useTheme();
  const { score, total, domainScores } = route.params;
  const totalPct = Math.round((score / total) * 100);

  const getLevel = (pct: number) => {
    if (pct >= 80) return 'Выраженно сохранный профиль';
    if (pct >= 60) return 'Умеренно сохранный профиль';
    return 'Есть зоны для тренировки';
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="Результат профиля" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[appColors.gradientStart, appColors.gradientEnd]} style={styles.hero}>
          <Text variant="displaySmall" style={styles.bigScore}>
            {totalPct}%
          </Text>
          <Text variant="titleMedium" style={styles.sub}>
            {score} из {total} правильных
          </Text>
        </LinearGradient>

        <Card style={[styles.card, shadows.soft]} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={{ textAlign: 'center' }}>
              {getLevel(totalPct)}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.sm }}>
              Это MVP-оценка и не заменяет консультацию специалиста.
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, shadows.soft]} mode="elevated">
          <Card.Content style={{ gap: spacing.sm }}>
            {(Object.keys(domainScores) as CognitiveDomain[]).map((domain) => {
              const val = domainScores[domain];
              const pct = Math.round((val / 5) * 100);
              return (
                <View key={domain} style={styles.row}>
                  <Text variant="bodyLarge">{domainTitles[domain]}</Text>
                  <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
                    {val}/5 ({pct}%)
                  </Text>
                </View>
              );
            })}
          </Card.Content>
        </Card>

        <Button mode="contained" icon="refresh" onPress={() => navigation.replace('CognitiveProfileTest')} style={styles.btn}>
          Пройти снова
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('TestMenu')} style={styles.btn}>
          К тестам
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
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  btn: { borderRadius: radii.md },
});
