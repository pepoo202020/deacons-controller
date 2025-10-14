"use client";

import { useLanguage } from "@/providers/language/LanguageProvider";

const AuthFooter = () => {
  const { t } = useLanguage();
  return (
    <div className="h-12 w-full flex items-center justify-center">
      {t("allRights")} @ {new Date().getFullYear()} - {t("poweredBy")}{" "}
      {t("developerName")}
    </div>
  );
};

export default AuthFooter;
