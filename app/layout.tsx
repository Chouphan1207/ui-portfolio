import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css"; // Kept locally in app layer for global styling

// FSD Shared Layer Imports
import { ThemeProvider } from "@/shared/ui/theme-provider";
import { LoadingProvider } from "@/lib/loading/loading-context";
import StoreProvider from "@/shared/state/provider";

// FSD App Layer Core Layout Composition
import ClientLayoutContent from "@/lib/loading/clientLayout";

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
            <StoreProvider>
              <ClientLayoutContent>{children}</ClientLayoutContent>
            </StoreProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
