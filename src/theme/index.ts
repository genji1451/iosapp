/** Legacy palette — aligned with `appTheme` for screens using plain StyleSheet */
export const colors = {
  primary: '#5B5FEF',
  primaryDark: '#4347D2',
  secondary: '#0EA5E9',
  tertiary: '#8B5CF6',
  background: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceMuted: '#E8ECF4',
  text: '#0F172A',
  textLight: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#F59E0B',
  splashBackground: '#4338CA',
  overlay: 'rgba(15, 23, 42, 0.45)',
  gradientStart: '#6366F1',
  gradientEnd: '#8B5CF6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 26,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.4,
  },
};

export const shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  soft: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
};
