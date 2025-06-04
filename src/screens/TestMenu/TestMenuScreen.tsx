import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TestMenuScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Я-СЛЫШУ</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.testCard}
          onPress={() => navigation.navigate('GDSTest')}
        >
          <Text style={styles.testTitle}>GDS-15</Text>
          <Text style={styles.testDescription}>Шкала депрессии</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.testCard}>
          <Text style={styles.testTitle}>IQ</Text>
          <Text style={styles.testDescription}>Тест на интеллект (скоро)</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  testCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  testTitle: {
    ...typography.h2,
    color: colors.text,
    flex: 1,
  },
  testDescription: {
    ...typography.body,
    color: colors.textLight,
    flex: 2,
    marginLeft: spacing.md,
  },
  arrow: {
    fontSize: 24,
    color: colors.textLight,
    marginLeft: spacing.md,
  },
}); 