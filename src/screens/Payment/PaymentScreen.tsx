import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/Button';

export default function PaymentScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Оплата</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionTitle}>Промокод</Text>
          <Text style={styles.paymentOptionDescription}>Активировать промокод</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.paymentOptionTitle}>Банковская карта</Text>
          <Text style={styles.paymentOptionDescription}>Visa, MasterCard, МИР</Text>
        </TouchableOpacity>

        <Button
          title="Продолжить"
          onPress={() => navigation.navigate('MainTabs')}
          style={styles.continueButton}
        />
      </View>
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
}); 