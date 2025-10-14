"use client";
import { useLanguage } from "@/providers/language/LanguageProvider";
import LogoComponent from "../shared/LogoC/main";
import SplashScreenDesc from "./content/SplashScreenDesc";

const SplashScreen = () => {
  const { t } = useLanguage();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2">
      {/* logo */}
      <LogoComponent
        imageSize="xl"
        splashScreen
        textSize="xl"
        text={t("appName")}
      />
      <SplashScreenDesc text={t("appDescription")} />
    </div>
  );
};

export default SplashScreen;
