"use client";
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "./language/LanguageProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

interface IProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: IProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LanguageProvider defaultLanguage="en" enableDetection={false}>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Providers;
