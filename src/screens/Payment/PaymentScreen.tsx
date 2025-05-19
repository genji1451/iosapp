import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type PaymentMethod = 'promo' | 'card' | null;

export default function PaymentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите способ оплаты');
      return;
    }

    if (selectedMethod === 'promo' && !promoCode) {
      Alert.alert('Ошибка', 'Пожалуйста, введите промокод');
      return;
    }

    if (selectedMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVV)) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля карты');
      return;
    }

    // Проверка промокода
    if (selectedMethod === 'promo' && promoCode.toLowerCase() !== 'test') {
      Alert.alert('Ошибка', 'Неверный промокод');
      return;
    }

    // В реальном приложении здесь была бы логика оплаты
    navigation.replace('MainTabs');
  };

  const handlePromoPress = () => {
    setSelectedMethod('promo');
    setShowPromoModal(true);
  };

  const handleCardPress = () => {
    setSelectedMethod('card');
    setShowCardModal(true);
  };

  const handlePromoSubmit = () => {
    if (!promoCode) {
      Alert.alert('Ошибка', 'Пожалуйста, введите промокод');
      return;
    }
    setShowPromoModal(false);
  };

  const handleCardSubmit = () => {
    if (!cardNumber || !cardExpiry || !cardCVV) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля карты');
      return;
    }
    setShowCardModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Оплата</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.paymentOption, selectedMethod === 'promo' && styles.selectedOption]}
          onPress={handlePromoPress}
        >
          <Text style={styles.paymentOptionTitle}>Промокод</Text>
          <Text style={styles.paymentOptionDescription}>
            {promoCode ? `Введен код: ${promoCode}` : 'Активировать промокод'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.paymentOption, selectedMethod === 'card' && styles.selectedOption]}
          onPress={handleCardPress}
        >
          <Text style={styles.paymentOptionTitle}>Банковская карта</Text>
          <Text style={styles.paymentOptionDescription}>
            {cardNumber ? 'Карта введена' : 'Visa, MasterCard, МИР'}
          </Text>
        </TouchableOpacity>

        <Button
          title="Оплатить"
          onPress={handlePayment}
          style={styles.continueButton}
        />
      </View>

      {/* Модальное окно для промокода */}
      <Modal
        visible={showPromoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPromoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Введите промокод</Text>
            <Text style={styles.modalDescription}>
              Введите промокод для активации подписки
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Промокод"
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="none"
            />
            <View style={styles.modalButtons}>
              <Button
                title="Отмена"
                onPress={() => setShowPromoModal(false)}
                style={[styles.modalButton, styles.secondaryButton]}
              />
              <Button
                title="Применить"
                onPress={handlePromoSubmit}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Модальное окно для карты */}
      <Modal
        visible={showCardModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Введите данные карты</Text>
            <TextInput
              style={styles.input}
              placeholder="Номер карты"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />
            <View style={styles.cardInputRow}>
              <TextInput
                style={[styles.input, styles.cardInput]}
                placeholder="MM/YY"
                value={cardExpiry}
                onChangeText={setCardExpiry}
                maxLength={5}
              />
              <TextInput
                style={[styles.input, styles.cardInput]}
                placeholder="CVV"
                value={cardCVV}
                onChangeText={setCardCVV}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
            <View style={styles.modalButtons}>
              <Button
                title="Отмена"
                onPress={() => setShowCardModal(false)}
                style={[styles.modalButton, styles.secondaryButton]}
              />
              <Button
                title="Сохранить"
                onPress={handleCardSubmit}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
    marginRight: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  paymentOption: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedOption: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  paymentOptionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  paymentOptionDescription: {
    ...typography.body,
    color: colors.textLight,
  },
  continueButton: {
    marginTop: spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  modalDescription: {
    ...typography.body,
    color: colors.textLight,
    marginBottom: spacing.lg,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    fontSize: 16,
  },
  cardInputRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cardInput: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  modalButton: {
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
}); 