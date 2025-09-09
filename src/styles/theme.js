// Global theme variables for the portfolio
export const theme = {
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#00f56b',
    text: {
      primary: '#000000',
      secondary: '#666666',
      muted: '#999999',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8f8f8',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    border: {
      light: '#e0e0e0',
      medium: '#cccccc',
    },
  },
  fonts: {
    primary: '"Roobert SemiBold", "Roobert SemiBold Placeholder", sans-serif',
    secondary: '"Roobert Regular", "Roobert Regular Placeholder", sans-serif',
    fallback: 'Inter, Inter Placeholder, sans-serif',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '200px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  zIndex: {
    menu: 9,
    modal: 10,
    tooltip: 11,
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
};

// CSS Variables for global usage
export const globalStyles = `
  :root {
    --color-primary: ${theme.colors.primary};
    --color-secondary: ${theme.colors.secondary};
    --color-accent: ${theme.colors.accent};
    --color-text-primary: ${theme.colors.text.primary};
    --color-text-secondary: ${theme.colors.text.secondary};
    --color-text-muted: ${theme.colors.text.muted};
    --color-background-primary: ${theme.colors.background.primary};
    --color-background-secondary: ${theme.colors.background.secondary};
    --color-background-overlay: ${theme.colors.background.overlay};
    --color-border-light: ${theme.colors.border.light};
    --color-border-medium: ${theme.colors.border.medium};
    
    --font-primary: ${theme.fonts.primary};
    --font-secondary: ${theme.fonts.secondary};
    --font-fallback: ${theme.fonts.fallback};
    
    --font-size-xs: ${theme.fontSizes.xs};
    --font-size-sm: ${theme.fontSizes.sm};
    --font-size-base: ${theme.fontSizes.base};
    --font-size-lg: ${theme.fontSizes.lg};
    --font-size-xl: ${theme.fontSizes.xl};
    --font-size-2xl: ${theme.fontSizes['2xl']};
    --font-size-3xl: ${theme.fontSizes['3xl']};
    
    --spacing-xs: ${theme.spacing.xs};
    --spacing-sm: ${theme.spacing.sm};
    --spacing-md: ${theme.spacing.md};
    --spacing-lg: ${theme.spacing.lg};
    --spacing-xl: ${theme.spacing.xl};
    --spacing-2xl: ${theme.spacing['2xl']};
    --spacing-3xl: ${theme.spacing['3xl']};
    --spacing-4xl: ${theme.spacing['4xl']};
    --spacing-5xl: ${theme.spacing['5xl']};
    
    --border-radius-sm: ${theme.borderRadius.sm};
    --border-radius-md: ${theme.borderRadius.md};
    --border-radius-lg: ${theme.borderRadius.lg};
    --border-radius-xl: ${theme.borderRadius.xl};
    --border-radius-full: ${theme.borderRadius.full};
    
    --shadow-sm: ${theme.shadows.sm};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    
    --z-index-menu: ${theme.zIndex.menu};
    --z-index-modal: ${theme.zIndex.modal};
    --z-index-tooltip: ${theme.zIndex.tooltip};
    
    --transition-fast: ${theme.transitions.fast};
    --transition-normal: ${theme.transitions.normal};
    --transition-slow: ${theme.transitions.slow};
  }
`;
