import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>🍀</Text>
      </View>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Я</Text>
        </View>
      </View>
      <Text style={styles.appName}>Я-СЛЫШУ</Text>
      <View style={styles.bottomEmojiContainer}>
        <Text style={styles.bottomEmoji}>🎧 👂 🎵</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.splashBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    position: 'absolute',
    top: '15%',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.background,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...typography.h1,
    color: colors.background,
    fontSize: 40,
  },
  appName: {
    ...typography.h1,
    color: colors.background,
    fontSize: 32,
  },
  bottomEmojiContainer: {
    position: 'absolute',
    bottom: '15%',
    alignItems: 'center',
  },
  bottomEmoji: {
    fontSize: 32,
    letterSpacing: 8,
  },
}); 