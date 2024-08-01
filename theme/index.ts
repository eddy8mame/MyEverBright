export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
};

export const COLORS = {
  primary: {
    main: '#0064E0',
    light: '#449EE9'
  },
  background: {
    // gradient: ['#1a3a3a', '#1a2a3a', '#1a1a2a', '#254141'],
    gradient: ['#1f2f3f', '#1b3539', '#1a313e', '#272f3c', '#1a2f40', '#254141'],
  },
  text: {
    primary: '#ffffff',
    secondary: '#cccccc',
  },
};

export const FONT_SIZE = {
  SM: 14,
  MD: 16,
  LG: 20,
  XL: 24,
};
export const theme = {
  colors: COLORS,
  spacing: SPACING,
  fontSize: FONT_SIZE,
  bgWhite: opacity => `rgba(255,255,255, ${opacity})`
}   