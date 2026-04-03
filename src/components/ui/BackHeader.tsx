import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

type Props = {
  title: string;
  subtitle?: string;
  onBack: () => void;
};

export function BackHeader({ title, subtitle, onBack }: Props) {
  const theme = useTheme();
  return (
    <Appbar.Header
      mode="small"
      elevated
      style={{ backgroundColor: theme.colors.surface }}
    >
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
}
