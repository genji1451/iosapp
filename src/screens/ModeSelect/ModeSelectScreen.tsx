import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, radii, shadows } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text, Chip, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const features = [
  {
    icon: 'ear-hearing' as const,
    title: 'Слух и речь',
    subtitle: 'Вербальный тренажёр для узнавания слов',
  },
  {
    icon: 'brain' as const,
    title: 'Диагностика',
    subtitle: 'Тесты и скрининг в удобном формате',
  },
  {
    icon: 'chart-timeline-variant' as const,
    title: 'Прогресс',
    subtitle: 'Следите за занятиями и результатами',
  },
];

export default function ModeSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text variant="headlineMedium" style={styles.heroKicker}>
            Добро пожаловать
          </Text>
          <Text variant="displaySmall" style={styles.heroTitle}>
            Тренажер слуха ПК1
          </Text>
          <Text variant="bodyLarge" style={styles.heroSub}>
            Персональный тренажёр для развития слухового восприятия и ясности речи.
          </Text>
          <View style={styles.heroChips}>
            <Chip icon="lightning-bolt" textStyle={{ color: theme.colors.onPrimaryContainer }} style={styles.chip}>
              Интерактивно
            </Chip>
            <Chip icon="shield-check" textStyle={{ color: theme.colors.onPrimaryContainer }} style={styles.chip}>
              Понятный интерфейс
            </Chip>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Возможности
          </Text>
          {features.map((f) => (
            <Card key={f.title} style={[styles.featureCard, shadows.soft]} mode="elevated">
              <Card.Content style={styles.featureRow}>
                <LinearGradient
                  colors={[theme.colors.primaryContainer, theme.colors.secondaryContainer]}
                  style={styles.featureIconWrap}
                >
                  <MaterialCommunityIcons name={f.icon} size={26} color={theme.colors.primary} />
                </LinearGradient>
                <View style={styles.featureText}>
                  <Text variant="titleMedium">{f.title}</Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    {f.subtitle}
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={22} color={theme.colors.onSurfaceVariant} />
              </Card.Content>
            </Card>
          ))}
        </View>

        <Button
          mode="contained"
          icon="play-circle"
          onPress={() => navigation.navigate('VerbalTrainerMenu')}
          style={styles.cta}
          contentStyle={styles.ctaContent}
          labelStyle={styles.ctaLabel}
        >
          Начать тренировку
        </Button>
        <Text variant="bodySmall" style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
          Рекомендуем наушники для точного восприятия сигналов.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingBottom: spacing.xxl },
  hero: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: radii.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
  heroKicker: { color: 'rgba(255,255,255,0.9)', marginBottom: spacing.xs },
  heroTitle: { color: '#fff', fontWeight: '800', marginBottom: spacing.sm },
  heroSub: { color: 'rgba(255,255,255,0.92)', marginBottom: spacing.md },
  heroChips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { backgroundColor: 'rgba(255,255,255,0.2)' },
  section: { paddingHorizontal: spacing.md, marginTop: spacing.lg, gap: spacing.md },
  sectionTitle: { marginBottom: spacing.xs },
  featureCard: { borderRadius: radii.lg },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  featureIconWrap: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: { flex: 1 },
  cta: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    borderRadius: radii.lg,
  },
  ctaContent: { paddingVertical: spacing.sm },
  ctaLabel: { fontSize: 17, fontWeight: '700' },
  hint: { textAlign: 'center', marginTop: spacing.md, paddingHorizontal: spacing.lg },
});
