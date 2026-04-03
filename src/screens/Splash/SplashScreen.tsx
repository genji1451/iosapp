import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();
  const scale = useRef(new Animated.Value(0.92)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [scale, opacity]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd, '#4F46E5']}
      style={styles.gradient}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
    >
      <Animated.View style={[styles.logoWrap, { transform: [{ scale }], opacity }]}>
        <View style={styles.logoRing}>
          <MaterialCommunityIcons name="headphones" size={56} color="#fff" />
        </View>
      </Animated.View>
      <Text variant="headlineLarge" style={styles.title}>
        Я-СЛЫШУ
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Слух · Речь · Уверенность
      </Text>
      <ActivityIndicator animating color="#fff" style={styles.loader} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  logoWrap: { marginBottom: spacing.lg },
  logoRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.xl,
  },
  loader: { marginTop: spacing.md },
});
