import { LanguageProvider } from "./language/LanguageProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

interface IProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: IProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider defaultLanguage="en" enableDetection={true}>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default Providers;
