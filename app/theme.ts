import { extendTheme } from '@chakra-ui/react';

// Custom theme to include TailwindCSS color and padding values
const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    teal: '#1E757B', // TailwindCSS Teal-600
    lime: '#D0EEC9', // TailwindCSS Lime-200
    babyLime: '#F7FFF5', // TailwindCSS Lime-50
    gray: {
      50: '#F9FAFB', // TailwindCSS Gray-50
      100: '#F3F4F6', // TailwindCSS Gray-100
      200: '#E5E7EB', // TailwindCSS Gray-200
      500: '#6B7280', // TailwindCSS Gray-500
      700: '#374151', // TailwindCSS Gray-700
      800: '#1F2937', // TailwindCSS Gray-800
    },
  },
  radii: {
    md: '0.375rem', // Rounded-md in TailwindCSS
  },
  space: {
    1: '0.25rem', // p-1 in TailwindCSS
    2: '0.5rem', // p-2 in TailwindCSS
    3: '0.75rem', // p-3 in TailwindCSS
    4: '1rem', // p-4 in TailwindCSS
    5: '1.25rem', // p-5 in TailwindCSS
  },
});

export default theme;
