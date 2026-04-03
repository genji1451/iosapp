import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  Card,
  useTheme,
} from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AuthScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (mode === 'login') {
        navigation.navigate('MainTabs', { screen: 'ModeSelect' });
      } else {
        navigation.navigate('GDSScreening');
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="Аккаунт" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text variant="headlineSmall" style={[styles.lead, { color: theme.colors.onBackground }]}>
            Войдите или создайте профиль — так мы сохраним прогресс и персональные рекомендации.
          </Text>

          <SegmentedButtons
            value={mode}
            onValueChange={(v) => setMode(v as 'login' | 'register')}
            buttons={[
              { value: 'login', label: 'Вход' },
              { value: 'register', label: 'Регистрация' },
            ]}
            style={styles.segmented}
          />

          <Card style={[styles.card, shadows.soft]} mode="elevated">
            <Card.Content style={styles.cardInner}>
              <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                left={<TextInput.Icon icon="email-outline" />}
                style={styles.input}
              />
              <TextInput
                mode="outlined"
                label="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                left={<TextInput.Icon icon="lock-outline" />}
                style={styles.input}
              />
              <Button
                mode="contained"
                icon={mode === 'login' ? 'login' : 'account-plus'}
                onPress={handleSubmit}
                style={styles.submit}
                contentStyle={styles.submitContent}
              >
                {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </Card.Content>
          </Card>

          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
            Продолжая, вы соглашаетесь с политикой конфиденциальности приложения.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.lg },
  lead: { lineHeight: 26 },
  segmented: { marginBottom: spacing.sm },
  card: { borderRadius: radii.lg },
  cardInner: { gap: spacing.sm },
  input: { backgroundColor: 'transparent' },
  submit: { marginTop: spacing.md, borderRadius: radii.md },
  submitContent: { paddingVertical: spacing.xs },
});
