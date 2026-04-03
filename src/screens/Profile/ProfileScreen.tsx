import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Avatar, Chip, useTheme, Divider } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const stats = [
  { icon: 'book-check' as const, label: 'Уроков', value: '15/42' },
  { icon: 'clock-outline' as const, label: 'Время', value: '12ч 30м' },
  { icon: 'target' as const, label: 'Точность', value: '87%' },
  { icon: 'fire' as const, label: 'Серия', value: '5 дн.' },
];

const achievements = [
  { icon: 'star-circle' as const, title: 'Первые шаги', desc: 'Завершён первый модуль' },
  { icon: 'school' as const, title: 'Отличник', desc: '10 уроков подряд' },
  { icon: 'flash' as const, title: 'Быстрый старт', desc: 'Серия из 5 дней' },
];

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Card style={[styles.hero, shadows.card]} mode="elevated">
          <Card.Content style={styles.heroContent}>
            <Avatar.Text size={72} label="ЯС" style={{ backgroundColor: theme.colors.primaryContainer }} color={theme.colors.primary} />
            <Text variant="headlineSmall" style={{ marginTop: spacing.md, color: theme.colors.onSurface }}>
              Пользователь
            </Text>
            <Chip icon="shield-star" style={styles.levelChip} textStyle={{ fontWeight: '600' }}>
              Уровень: Начинающий
            </Chip>
          </Card.Content>
        </Card>

        <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Статистика
        </Text>
        <View style={styles.grid}>
          {stats.map((s) => (
            <Card key={s.label} style={[styles.statCard, shadows.soft]} mode="elevated">
              <Card.Content style={styles.statInner}>
                <MaterialCommunityIcons name={s.icon} size={22} color={theme.colors.primary} />
                <Text variant="titleLarge" style={{ marginTop: spacing.xs }}>
                  {s.value}
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  {s.label}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Достижения
        </Text>
        {achievements.map((a, i) => (
          <Card key={a.title} style={[styles.achCard, shadows.soft]} mode="elevated">
            <Card.Content style={styles.achRow}>
              <View style={[styles.achIcon, { backgroundColor: theme.colors.secondaryContainer }]}>
                <MaterialCommunityIcons name={a.icon} size={24} color={theme.colors.secondary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="titleSmall">{a.title}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  {a.desc}
                </Text>
              </View>
            </Card.Content>
            {i < achievements.length - 1 ? null : null}
          </Card>
        ))}
        <Divider style={{ marginVertical: spacing.lg }} />
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
          Данные обновляются после каждой тренировки.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  hero: { borderRadius: radii.xl, marginBottom: spacing.lg },
  heroContent: { alignItems: 'center' },
  levelChip: { marginTop: spacing.sm },
  sectionTitle: { marginBottom: spacing.md, marginTop: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.lg },
  statCard: { width: '47%', borderRadius: radii.lg },
  statInner: { alignItems: 'center', minHeight: 100, justifyContent: 'center' },
  achCard: { borderRadius: radii.lg, marginBottom: spacing.md },
  achRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  achIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
