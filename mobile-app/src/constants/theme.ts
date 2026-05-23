export const theme = {
  colors: {
    // Brand & UI colors from Transparent Guardian spec
    background: '#f7f9fb', // surface-bright
    cardBackground: '#ffffff', // surface-container-lowest
    cardBorder: '#e2e8f0', // Neutral 200 equivalent
    primary: '#2470eb', // Azure Blue
    primaryDark: '#0058c8', // surface-tint
    text: '#191c1e', // Midnight Navy / on-surface
    textSecondary: '#727785', // Slate Grey / outline
    success: '#10B981', // Keeping standard vibrant success
    error: '#ba1a1a',
    warning: '#F59E0B',
    white: '#ffffff',
    surfaceVariant: '#e0e3e5',
    elevationOverlay: 'rgba(255, 255, 255, 0.8)',
    secondary: '#565e74',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    surfaceContainerHigh: '#e6e8ea',
    surfaceContainerHighest: '#e0e3e5',
    outline: '#727785',
  },
  spacing: {
    xs: 4,
    sm: 8,      // stack-sm
    md: 16,     // stack-md
    lg: 24,     // stack-lg
    xl: 32,
    xxl: 48,
    marginMobile: 20, // fixed outer margin
    hitAreaMin: 44,
  },
  borderRadius: {
    sm: 4,
    md: 8,      // 0.5rem (input fields, primary containers)
    lg: 16,     // 1rem (cards)
    xl: 24,
    full: 9999, // buttons, chips
  },
  typography: {
    display: {
      fontFamily: 'HankenGrotesk_700Bold',
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: -0.64, // -0.02em of 32
    },
    headlineLg: {
      fontFamily: 'HankenGrotesk_600SemiBold',
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: -0.24, // -0.01em of 24
    },
    headlineMd: {
      fontFamily: 'HankenGrotesk_600SemiBold',
      fontSize: 20,
      lineHeight: 28,
    },
    bodyLg: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      lineHeight: 24,
    },
    bodyMd: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      lineHeight: 20,
    },
    labelLg: {
      fontFamily: 'HankenGrotesk_600SemiBold',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.28, // 0.02em of 14
    },
    labelMd: {
      fontFamily: 'HankenGrotesk_500Medium',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.48, // 0.04em of 12
    },
    labelSm: {
      fontFamily: 'HankenGrotesk_500Medium',
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.55, // 0.05em of 11
    },
  }
};
