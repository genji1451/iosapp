import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestTabParamList } from '../../navigation/TestTabNavigator';
import { spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, Chip, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<TestTabParamList>;

const tests = [
  {
    id: 'gds',
    title: 'GDS-15',
    subtitle: 'Шкала депрессии Гериатрическая',
    icon: 'clipboard-pulse' as const,
    available: true,
  },
  {
    id: 'iq',
    title: 'Когнитивный профиль',
    subtitle: 'MVP-оценка по 4 когнитивным доменам',
    icon: 'head-cog' as const,
    available: true,
  },
];

export default function TestMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: theme.colors.onBackground }}>
          Тесты
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Короткие опросники с понятными результатами
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {tests.map((t) => (
          <Card key={t.id} style={[styles.card, shadows.soft]} mode="elevated">
            <Card.Content>
              <View style={styles.row}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.tertiaryContainer }]}>
                  <MaterialCommunityIcons name={t.icon} size={28} color={theme.colors.tertiary} />
                </View>
                <View style={styles.textCol}>
                  <View style={styles.titleRow}>
                    <Text variant="titleMedium">{t.title}</Text>
                    {!t.available && (
                      <Chip compact style={styles.badge}>
                        Скоро
                      </Chip>
                    )}
                  </View>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    {t.subtitle}
                  </Text>
                </View>
              </View>
              <Button
                mode={t.available ? 'contained' : 'outlined'}
                disabled={!t.available}
                icon={t.available ? 'play' : 'lock-outline'}
                onPress={() => navigation.navigate(t.id === 'gds' ? 'GDSTest' : 'CognitiveProfileTest')}
                style={styles.btn}
              >
                {t.available ? 'Начать' : 'Недоступно'}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.md, gap: spacing.xs },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.md },
  card: { borderRadius: radii.lg },
  row: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
  badge: { alignSelf: 'flex-start' },
  btn: { borderRadius: radii.md },
});
