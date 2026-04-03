import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows, colors as appColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Button, Chip, useTheme } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LESSONS_COUNT, TASKS_PER_LESSON } from '../../data/intonationData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function IntonationTrainerMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="Интонация" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[appColors.secondary, appColors.primary]} style={styles.hero}>
          <MaterialCommunityIcons name="waveform" size={44} color="#fff" />
          <Text variant="titleLarge" style={styles.heroTitle}>
            Интонационный тренажёр
          </Text>
          <Text variant="bodyMedium" style={styles.heroSub}>
            Упражнения на мелодику, ритм и эмоциональные оттенки речи.
          </Text>
          <Chip icon="playlist-check" style={styles.chip} textStyle={{ color: '#fff' }}>
            {LESSONS_COUNT} уроков по {TASKS_PER_LESSON} заданий
          </Chip>
        </LinearGradient>

        <Card style={[styles.card, shadows.soft]} mode="elevated">
          <Card.Content>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, lineHeight: 24 }}>
              Слушайте фразы, определяйте правильную интонацию и отслеживайте прогресс по урокам.
            </Text>
          </Card.Content>
        </Card>

        <Button mode="contained" icon="play-circle" onPress={() => navigation.navigate('IntonationTrainerLessons')} style={styles.btn}>
          Начать интонационный тренажёр
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingBottom: spacing.xxl },
  hero: {
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: radii.xl,
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  heroTitle: { color: '#fff', fontWeight: '700' },
  heroSub: { color: 'rgba(255,255,255,0.92)' },
  chip: { backgroundColor: 'rgba(255,255,255,0.2)', marginTop: spacing.sm },
  card: { marginHorizontal: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md },
  btn: { marginHorizontal: spacing.md, borderRadius: radii.lg },
});
