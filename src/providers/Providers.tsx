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
      {children}
    </ThemeProvider>
  );
}

export default Providers;
