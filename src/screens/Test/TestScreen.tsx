import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Chip, useTheme } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const answers = [
  { id: 1, text: 'Первый вариант ответа' },
  { id: 2, text: 'Второй вариант ответа' },
  { id: 3, text: 'Третий вариант ответа' },
  { id: 4, text: 'Четвертый вариант ответа' },
];

export default function TestScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="Проверка" subtitle="Выберите вариант" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Card style={[styles.prompt, shadows.soft]} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={{ lineHeight: 26 }}>
              Какой из предложенных вариантов лучше всего описывает услышанный звук?
            </Text>
            <Chip icon="information" style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}>
              Демо-экран
            </Chip>
          </Card.Content>
        </Card>

        {answers.map((answer) => {
          const active = selected === answer.id;
          return (
            <Pressable key={answer.id} onPress={() => setSelected(answer.id)}>
              <Card
                style={[
                  styles.option,
                  shadows.soft,
                  active && { borderColor: theme.colors.primary, borderWidth: 2 },
                ]}
                mode="elevated"
              >
                <Card.Content style={styles.optionRow}>
                  <MaterialCommunityIcons
                    name={active ? 'radiobox-marked' : 'radiobox-blank'}
                    size={24}
                    color={active ? theme.colors.primary : theme.colors.onSurfaceVariant}
                  />
                  <Text variant="bodyLarge" style={{ flex: 1, marginLeft: spacing.md, color: theme.colors.onSurface }}>
                    {answer.text}
                  </Text>
                </Card.Content>
              </Card>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.md },
  prompt: { borderRadius: radii.lg },
  option: { borderRadius: radii.lg },
  optionRow: { flexDirection: 'row', alignItems: 'center' },
});
