"use client";
import { useLanguage } from "@/providers/language/LanguageProvider";
import LogoComponent from "../shared/LogoC/main";
import SplashScreenDesc from "./content/SplashScreenDesc";
import SplashScreenVerse from "./content/SplashScreenVerse";
import Loading from "../shared/LoadingC/Loading";

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
      <SplashScreenVerse verse={t("verse")} />
      <Loading mode="text" text={t("loadingSplashScreen")} />
    </div>
  );
};

export default SplashScreen;
