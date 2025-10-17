"use client";
import CustomCard from "@/components/shared/CardC/main";
import { useLanguage } from "@/providers/language/LanguageProvider";
import LoginFormBody from "./content/LoginFormBody";

const LoginBody = () => {
  const { t, isRTL } = useLanguage();

  const body = (
    <>
      <LoginFormBody t={t} />
    </>
  );
  return (
    <CustomCard
      width="md"
      alignText="center"
      description={t("appDescription")}
      title={t("appName")}
      titleSize="3xl"
      body={body}
      isRTL={isRTL}
    />
  );
};

export default LoginBody;
