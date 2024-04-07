import { extendTheme } from '@chakra-ui/react';

const colors = {
  teal: {
    main: "#1E757B",
    500: "#41aeb5",
  },
  babyLime: '#F7FFF5', 
  black: "#1F2937",
  white: "#ffffff",
  gray: { 
    700: '#374151',
    500: '#6B7280',
    200: '#E5E7EB',
    100: '#F3F4F6',
    50: '#F9FAFB',
  },
};

export const theme = extendTheme({
    radii: {
      md: '4px', 
    },
    space: {
      1: '4px',
      2: '8px', 
      3: '12px', 
      4: '16px', 
      5: '20px', 
    },
    colors: colors
  });
