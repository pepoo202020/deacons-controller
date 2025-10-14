"use client";
import { useLanguage } from "@/providers/language/LanguageProvider";
import LogoComponent from "../shared/LogoC/main";

const SplashScreen = () => {
  const { t } = useLanguage();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {/* logo */}
      <LogoComponent
        imageSize="xl"
        splashScreen
        textSize="xl"
        text={t("appName")}
      />
    </div>
  );
};

export default SplashScreen;
