"use client";
import { useLanguage } from "@/providers/language/LanguageProvider";
import LogoComponent from "../shared/LogoC/main";
import SplashScreenDesc from "./content/SplashScreenDesc";
import SplashScreenVerse from "./content/SplashScreenVerse";
import Loading from "../shared/LoadingC/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SplashScreen = () => {
  const { t } = useLanguage();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const interval = setTimeout(() => {
      if (status === "authenticated") {
        router.push("/dashboard");
      } else {
        router.push("/auth");
      }
    }, 2000);
    return () => {
      clearTimeout(interval);
    };
  }, [router, status]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2 animate-fade-in">
      {/* logo */}
      <LogoComponent
        imageSize="xl"
        splashScreen
        textSize="xl"
        text={t("appName")}
        header={false}
      />
      <SplashScreenDesc text={t("appDescription")} />
      <SplashScreenVerse verse={t("verse")} />
      <Loading mode="text" text={t("loadingSplashScreen")} />
    </div>
  );
};

export default SplashScreen;
