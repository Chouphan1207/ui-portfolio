import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css"; // Kept locally in app layer for global styling

// FSD Shared Layer Imports
import { ThemeProvider } from "@/components/background/ThemeProvider";
import { LoadingProvider } from "@/components/loading/loading-context";

// FSD App Layer Core Layout Composition
import ClientLayoutContent from "@/components/loading/clientLayout";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tedsphan's Portfolio",
  description: "Modern & Minimalist JS Mastery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
              <ClientLayoutContent>{children}</ClientLayoutContent>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
