"use client";
import LanguageSelector from "@/components/shared/LanguageSelector/main";
import Loading from "@/components/shared/LoadingC/Loading";
import LogoComponent from "@/components/shared/LogoC/main";
import { useLanguage } from "@/providers/language/LanguageProvider";

const AuthHeader = () => {
  const {
    t,
    isRTL,
    isLoading: languageLoading,
    changeLanguage,
  } = useLanguage();

  if (languageLoading) {
    <Loading mode="page" text={t("changingLanguage")} />;
  }
  return (
    <div className="h-20 w-full max-w-7xl mx-auto flex items-center justify-between">
      {/* logo */}
      <LogoComponent
        imageSize="sm"
        splashScreen={false}
        header
        text={t("appName")}
        textSize="sm"
      />
      {/* Language and Theme Selector */}
      <div className="flex items-center justify-end gap-5">
        <LanguageSelector t={t} isRTL={isRTL} changeLanguage={changeLanguage} />
      </div>
    </div>
  );
};

export default AuthHeader;
