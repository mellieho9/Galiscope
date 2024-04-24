import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers/index";
import { fonts } from './fonts'


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Galiscope",
  description: "An AI-powered tool for amateur and neurodivergent researchers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.inter.variable}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center bg-gray-50">
          <Providers>
          {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
