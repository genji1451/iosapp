import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, TextInput, Portal, Dialog, RadioButton, useTheme, List, Divider } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PaymentMethod = 'promo' | 'card' | null;

export default function PaymentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [promoOpen, setPromoOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const handlePayment = () => {
    if (!method) {
      Alert.alert('Выберите способ', 'Укажите промокод или оплату картой.');
      return;
    }
    if (method === 'promo' && !promoCode) {
      Alert.alert('Промокод', 'Введите и примените промокод.');
      return;
    }
    if (method === 'card' && (!cardNumber || !cardExpiry || !cardCVV)) {
      Alert.alert('Карта', 'Заполните данные карты в форме.');
      return;
    }
    if (method === 'promo' && promoCode.toLowerCase() !== 'test') {
      Alert.alert('Ошибка', 'Неверный промокод');
      return;
    }
    navigation.replace('MainTabs', { screen: 'ModeSelect' });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader title="Оплата" subtitle="Активация доступа" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.md }}>
          Выберите удобный способ. Для демо подходит промокод «test».
        </Text>

        <Card style={[styles.card, shadows.soft]} mode="elevated">
          <Card.Content>
            <RadioButton.Group onValueChange={(v) => setMethod(v as PaymentMethod)} value={method ?? ''}>
              <Pressable onPress={() => { setMethod('promo'); setPromoOpen(true); }}>
                <List.Item
                  title="Промокод"
                  description={promoCode ? `Код: ${promoCode}` : 'Активировать предоплаченный доступ'}
                  left={() => <MaterialCommunityIcons name="ticket-confirmation" size={26} color={theme.colors.primary} />}
                  right={() => <RadioButton value="promo" />}
                />
              </Pressable>
              <Divider />
              <Pressable onPress={() => { setMethod('card'); setCardOpen(true); }}>
                <List.Item
                  title="Банковская карта"
                  description={cardNumber ? 'Данные сохранены' : 'Visa, MasterCard, МИР'}
                  left={() => <MaterialCommunityIcons name="credit-card-outline" size={26} color={theme.colors.secondary} />}
                  right={() => <RadioButton value="card" />}
                />
              </Pressable>
            </RadioButton.Group>
          </Card.Content>
        </Card>

        <Button mode="contained" icon="check-decagram" onPress={handlePayment} style={styles.pay}>
          Оплатить и продолжить
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={promoOpen} onDismiss={() => setPromoOpen(false)} style={styles.dialog}>
          <Dialog.Title>Промокод</Dialog.Title>
          <Dialog.Content>
            <TextInput mode="outlined" label="Код" value={promoCode} onChangeText={setPromoCode} autoCapitalize="none" />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPromoOpen(false)}>Отмена</Button>
            <Button mode="contained" onPress={() => setPromoOpen(false)}>
              Готово
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={cardOpen} onDismiss={() => setCardOpen(false)} style={styles.dialog}>
          <Dialog.Title>Данные карты</Dialog.Title>
          <Dialog.Content>
            <TextInput mode="outlined" label="Номер" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" maxLength={16} style={styles.gap} />
            <View style={styles.row}>
              <TextInput mode="outlined" label="MM/YY" value={cardExpiry} onChangeText={setCardExpiry} style={[styles.flex, styles.gap]} maxLength={5} />
              <TextInput mode="outlined" label="CVV" value={cardCVV} onChangeText={setCardCVV} keyboardType="numeric" secureTextEntry style={[styles.flex, styles.gap]} maxLength={3} />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCardOpen(false)}>Отмена</Button>
            <Button mode="contained" onPress={() => setCardOpen(false)}>
              Сохранить
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.md },
  card: { borderRadius: radii.lg },
  pay: { marginTop: spacing.md, borderRadius: radii.lg },
  dialog: { borderRadius: radii.lg },
  gap: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.md },
  flex: { flex: 1 },
});
