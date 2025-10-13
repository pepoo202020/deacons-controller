"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

import i18n from "i18next";
import {
  useTranslation as useI18nTranslation,
  initReactI18next,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "@/data/locals/ar.json";
import en from "@/data/locals/en.json";

/**
 * Supported languages in the application
 */
export type SupportedLanguage = "ar" | "en";

/**
 * Language direction mapping
 */
const LANGUAGE_DIRECTIONS: Record<SupportedLanguage, "ltr" | "rtl"> = {
  ar: "rtl",
  en: "ltr",
} as const;

/**
 * Available languages configuration
 */
export const AVAILABLE_LANGUAGES: readonly SupportedLanguage[] = [
  "ar",
  "en",
] as const;

/**
 * Language detection configuration
 */
const LANGUAGE_DETECTION_CONFIG = {
  order: ["localStorage", "navigator", "htmlTag"],
  caches: ["localStorage"],
  lookupLocalStorage: "preferred-language",
  cookieMinutes: 60 * 24 * 7, // 7 days
};

/**
 * Props for the LanguageProvider component
 */
interface LanguageProviderProps {
  /** Child components to be wrapped with language context */
  children: ReactNode;
  /** Default language to use if no preference is found */
  defaultLanguage?: SupportedLanguage;
  /** Whether to enable automatic language detection */
  enableDetection?: boolean;
}

/**
 * Language context value interface
 */
interface LanguageContextValue {
  /** Current active language */
  readonly language: SupportedLanguage;
  /** Change language function */
  readonly changeLanguage: (language: SupportedLanguage) => Promise<void>;
  /** Translation function */
  readonly t: (key: string, options?: Record<string, unknown>) => string;
  /** Loading state for language changes */
  readonly isLoading: boolean;
  /** Error state for language operations */
  readonly error: string | null;
  /** Available languages list */
  readonly availableLanguages: readonly SupportedLanguage[];
  /** Whether current language is RTL */
  readonly isRTL: boolean;
  /** Current language direction */
  readonly direction: "ltr" | "rtl";
  /** Clear any language-related errors */
  readonly clearError: () => void;
}

/**
 * Initialize i18next with professional configuration
 */
const initializeI18n = () => {
  if (i18n.isInitialized) {
    return i18n;
  }

  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        ar: { translation: ar },
        en: { translation: en },
      },
      lng: "en",
      fallbackLng: "en",
      supportedLngs: AVAILABLE_LANGUAGES,
      interpolation: {
        escapeValue: false,
        formatSeparator: ",",
      },
      detection: LANGUAGE_DETECTION_CONFIG,
      react: {
        useSuspense: false,
        bindI18n: "languageChanged loaded",
        bindI18nStore: "added removed",
        transEmptyNodeValue: "",
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
      },
      debug: process.env.NODE_ENV === "development",
    });
};

// Initialize i18n
initializeI18n();

/**
 * Language context for providing language state throughout the app
 */
export const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Professional Language Provider Component
 *
 * Provides internationalization (i18n) functionality throughout the application.
 * Features:
 * - Automatic language detection
 * - Persistent language preferences
 * - RTL/LTR support
 * - Error handling and loading states
 * - Performance optimizations
 *
 * @param props - LanguageProvider configuration
 * @returns Language context provider component
 */
export function LanguageProvider({
  children,
  defaultLanguage = "en",
  enableDetection = true,
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n: i18nInstance } = useI18nTranslation();

  /**
   * Clear any language-related errors
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Check if language is RTL (Right-to-Left)
   */
  const isRTL = useMemo(() => {
    return LANGUAGE_DIRECTIONS[language] === "rtl";
  }, [language]);

  /**
   * Get current language direction
   */
  const direction = useMemo(() => {
    return LANGUAGE_DIRECTIONS[language];
  }, [language]);

  /**
   * Enhanced language change function with comprehensive error handling
   */
  const changeLanguage = useCallback(
    async (newLanguage: SupportedLanguage) => {
      // Prevent unnecessary changes
      if (newLanguage === language) {
        return;
      }

      // Validate language
      if (!AVAILABLE_LANGUAGES.includes(newLanguage)) {
        const errorMessage = `Unsupported language: ${newLanguage}`;
        setError(errorMessage);
        console.error(errorMessage);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Change language in i18next
        await i18nInstance.changeLanguage(newLanguage);

        // Update local state
        setLanguage(newLanguage);

        // Update document attributes for accessibility and styling
        const newDirection = LANGUAGE_DIRECTIONS[newLanguage];
        document.dir = newDirection;
        document.documentElement.lang = newLanguage;
        document.documentElement.setAttribute("data-direction", newDirection);

        // Persist language preference
        if (typeof window !== "undefined") {
          localStorage.setItem(
            LANGUAGE_DETECTION_CONFIG.lookupLocalStorage,
            newLanguage
          );
        }

        // Dispatch custom event for other components to listen
        window.dispatchEvent(
          new CustomEvent("languageChanged", {
            detail: { language: newLanguage, direction: newDirection },
          })
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : `Failed to change language to ${newLanguage}`;

        setError(errorMessage);
        console.error("Language change error:", err);

        // Fallback to previous language
        try {
          await i18nInstance.changeLanguage(language);
        } catch (fallbackErr) {
          console.error("Fallback language change failed:", fallbackErr);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [language, i18nInstance]
  );

  /**
   * Initialize language from stored preferences or browser settings
   */
  useEffect(() => {
    const initializeLanguage = async () => {
      if (!enableDetection) {
        return;
      }

      try {
        let targetLanguage: SupportedLanguage = defaultLanguage;

        // Check localStorage first
        if (typeof window !== "undefined") {
          const savedLanguage = localStorage.getItem(
            LANGUAGE_DETECTION_CONFIG.lookupLocalStorage
          ) as SupportedLanguage;

          if (savedLanguage && AVAILABLE_LANGUAGES.includes(savedLanguage)) {
            targetLanguage = savedLanguage;
          } else {
            // Fallback to browser language detection
            const browserLanguage = navigator.language.split(
              "-"
            )[0] as SupportedLanguage;
            if (AVAILABLE_LANGUAGES.includes(browserLanguage)) {
              targetLanguage = browserLanguage;
            }
          }
        }

        // Apply the determined language
        if (targetLanguage !== language) {
          await changeLanguage(targetLanguage);
        }
      } catch (err) {
        console.error("Language initialization error:", err);
        setError("Failed to initialize language preferences");
      }
    };

    initializeLanguage();
  }, [changeLanguage, language, defaultLanguage, enableDetection]);

  /**
   * Update document attributes when language changes
   */
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.dir = direction;
      document.documentElement.lang = language;
      document.documentElement.setAttribute("data-direction", direction);
    }
  }, [language, direction]);

  /**
   * Enhanced translation function with error handling and fallbacks
   */
  const enhancedT = useCallback(
    (key: string, options?: Record<string, unknown>) => {
      try {
        const result = t(key, options);

        // Return key if translation is missing
        if (typeof result === "string" && result === key) {
          console.warn(`Translation missing for key: "${key}"`);
          return key;
        }

        return typeof result === "string" ? result : String(result);
      } catch (err) {
        console.warn(`Translation error for key "${key}":`, err);
        return key;
      }
    },
    [t]
  );

  /**
   * Memoized context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      language,
      changeLanguage,
      t: enhancedT,
      isLoading,
      error,
      availableLanguages: AVAILABLE_LANGUAGES,
      isRTL,
      direction,
      clearError,
    }),
    [
      language,
      changeLanguage,
      enhancedT,
      isLoading,
      error,
      isRTL,
      direction,
      clearError,
    ]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook for accessing language context
 *
 * @throws Error if used outside of LanguageProvider
 * @returns Language context value
 */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider. " +
        "Make sure to wrap your component with <LanguageProvider>."
    );
  }

  return context;
}

/**
 * Hook for getting current language direction
 *
 * @returns Current language direction ("ltr" or "rtl")
 */
export function useLanguageDirection(): "ltr" | "rtl" {
  const { direction } = useLanguage();
  return direction;
}

/**
 * Hook for checking if a specific language is RTL
 *
 * @param lang - Optional language to check (defaults to current language)
 * @returns True if the language is RTL
 */
export function useIsRTL(lang?: SupportedLanguage): boolean {
  const { language } = useLanguage();
  const targetLang = lang || language;
  return LANGUAGE_DIRECTIONS[targetLang] === "rtl";
}

/**
 * Hook for getting available languages
 *
 * @returns Array of available languages
 */
export function useAvailableLanguages(): readonly SupportedLanguage[] {
  const { availableLanguages } = useLanguage();
  return availableLanguages;
}

/**
 * Hook for language change functionality
 *
 * @returns Object with language change function and loading state
 */
export function useLanguageChange() {
  const { changeLanguage, isLoading, error, clearError } = useLanguage();

  return {
    changeLanguage,
    isLoading,
    error,
    clearError,
  };
}

/**
 * Hook for translation functionality
 *
 * @returns Translation function
 */
export function useTranslationHook() {
  const { t } = useLanguage();
  return t;
}

/**
 * Utility function to validate if a language is supported
 *
 * @param lang - Language to validate
 * @returns True if language is supported
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return AVAILABLE_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Utility function to get language direction
 *
 * @param lang - Language code
 * @returns Language direction
 */
export function getLanguageDirection(lang: SupportedLanguage): "ltr" | "rtl" {
  return LANGUAGE_DIRECTIONS[lang];
}
