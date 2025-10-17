"use client";

import { useLanguage } from "@/providers/language/LanguageProvider";

const ForgetPasswordModal = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-end relative">
      <div className="text-white dark:text-[#1E253C] cursor-pointer text-sm font-medium hover:underline">
        {t("forgetPassword")}
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
