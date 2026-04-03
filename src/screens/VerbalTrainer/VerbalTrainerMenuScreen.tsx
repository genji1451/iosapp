import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows, colors as appColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, Chip, useTheme } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function VerbalTrainerMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="Вербальный тренажёр" onBack={() => navigation.navigate('MainTabs', { screen: 'ModeSelect' })} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[appColors.gradientStart, appColors.gradientEnd]} style={styles.hero}>
          <MaterialCommunityIcons name="ear-hearing" size={40} color="#fff" />
          <Text variant="titleLarge" style={styles.heroTitle}>
            Тренировка слуха
          </Text>
          <Text variant="bodyMedium" style={styles.heroSub}>
            Слушайте слово и выбирайте верный вариант из четырёх.
          </Text>
          <View style={styles.chips}>
            <Chip style={styles.chip} textStyle={{ color: '#fff' }} icon="playlist-check">
              10 уроков
            </Chip>
            <Chip style={styles.chip} textStyle={{ color: '#fff' }} icon="counter">
              20 заданий
            </Chip>
          </View>
        </LinearGradient>

        <Card style={[styles.card, shadows.soft]} mode="elevated">
          <Card.Content>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, lineHeight: 24 }}>
              Регулярные занятия помогают лучше различать похожие звуки и слова, улучшают уверенность в общении.
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          icon="play-circle-outline"
          onPress={() => navigation.navigate('VerbalTrainerLessons')}
          style={styles.primaryBtn}
          contentStyle={styles.btnContent}
        >
          Начать тренировку
        </Button>

        <Button
          mode="outlined"
          icon="clipboard-check-outline"
          onPress={() => navigation.navigate('VerbalTrainerControl')}
          style={styles.secondaryBtn}
        >
          Контрольное задание (50 вопросов)
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
  heroTitle: { color: '#fff', fontWeight: '700', marginTop: spacing.sm },
  heroSub: { color: 'rgba(255,255,255,0.9)' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  chip: { backgroundColor: 'rgba(255,255,255,0.2)' },
  card: { marginHorizontal: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md },
  primaryBtn: { marginHorizontal: spacing.md, borderRadius: radii.lg, marginBottom: spacing.sm },
  secondaryBtn: { marginHorizontal: spacing.md, borderRadius: radii.lg },
  btnContent: { paddingVertical: spacing.sm },
});
