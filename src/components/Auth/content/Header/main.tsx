"use client";
import LogoComponent from "@/components/shared/LogoC/main";
import { useLanguage } from "@/providers/language/LanguageProvider";

const AuthHeader = () => {
  const { t } = useLanguage();
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
    </div>
  );
};

export default AuthHeader;
