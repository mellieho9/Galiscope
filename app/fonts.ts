// app/fonts.ts
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],  // Choose the subsets you want to include
  variable: '--font-inter',  // Define a CSS variable for the font
  // Add any other configuration options needed
})

export const fonts = {
  inter,
}
