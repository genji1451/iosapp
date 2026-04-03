import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  style,
  icon,
  loading,
  disabled,
}: ButtonProps) => {
  const theme = useTheme();
  const isSecondary = variant === 'secondary';
  return (
    <PaperButton
      mode={isSecondary ? 'outlined' : 'contained'}
      onPress={onPress}
      style={style}
      icon={icon}
      loading={loading}
      disabled={disabled}
      buttonColor={isSecondary ? undefined : theme.colors.primary}
      textColor={isSecondary ? theme.colors.primary : theme.colors.onPrimary}
    >
      {title}
    </PaperButton>
  );
};
