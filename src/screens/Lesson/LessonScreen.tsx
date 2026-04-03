import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, FAB, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const answers = [
  { id: 1, text: 'Вариант 1' },
  { id: 2, text: 'Вариант 2' },
  { id: 3, text: 'Вариант 3' },
  { id: 4, text: 'Вариант 4' },
  { id: 5, text: 'Вариант 5' },
  { id: 6, text: 'Вариант 6' },
];

const total = 5;
const current = 3;

export default function LessonScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.top, { borderBottomColor: theme.colors.outlineVariant }]}>
        <Text variant="headlineSmall">Упражнение {current} из {total}</Text>
        <View style={styles.dots}>
          {Array.from({ length: total }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i + 1 < current ? colors.success : i + 1 === current ? theme.colors.primary : theme.colors.outlineVariant,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable onPress={() => setIsPlaying(!isPlaying)}>
          <Card style={[styles.playCard, shadows.card]} mode="elevated">
            <Card.Content style={styles.playInner}>
              <MaterialCommunityIcons
                name={isPlaying ? 'pause-circle' : 'play-circle'}
                size={72}
                color={theme.colors.primary}
              />
              <Text variant="titleMedium" style={{ marginTop: spacing.md }}>
                {isPlaying ? 'Пауза' : 'Воспроизвести'}
              </Text>
            </Card.Content>
          </Card>
        </Pressable>

        <View style={styles.grid}>
          {answers.map((answer) => (
            <Card key={answer.id} style={[styles.cell, shadows.soft]} mode="elevated">
              <Card.Content style={styles.cellInner}>
                <Text variant="bodySmall" style={{ textAlign: 'center', color: theme.colors.onSurface }}>
                  {answer.text}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>

      <FAB icon="information-outline" style={[styles.fab, { backgroundColor: theme.colors.secondary }]} onPress={() => {}} small />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  top: { padding: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth },
  dots: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  dot: { width: 10, height: 10, borderRadius: 5 },
  scroll: { padding: spacing.md, paddingBottom: 100, gap: spacing.lg },
  playCard: { borderRadius: radii.xl },
  playInner: { alignItems: 'center', paddingVertical: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'space-between' },
  cell: { width: '47%', borderRadius: radii.md,
    minHeight: 88,
    justifyContent: 'center',
  },
  cellInner: { alignItems: 'center', justifyContent: 'center' },
  fab: { position: 'absolute', right: spacing.md, bottom: spacing.lg },
});
