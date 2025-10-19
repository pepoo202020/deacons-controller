"use client";

import CustomModal from "@/components/shared/CustomModal/main";
import { useLanguage } from "@/providers/language/LanguageProvider";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const ForgetPasswordModal = () => {
  const { t, isRTL } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleForgetClick = useCallback(() => {
    setOpen((pre) => !pre);
  }, []);
  const modalFooter = (
    <>
      <Link
        href={`https://wa.me/+201126884803`}
        target="_blank"
        className="bg-green-700 flex items-center justify-center gap-2 text-white hover:bg-green-800 cursor-pointer p-3 rounded-2xl"
      >
        <FaWhatsapp size={24} />
        {t("contactAdminButton")}
      </Link>
    </>
  );

  return (
    <div className="flex items-center justify-end relative">
      <div
        onClick={handleForgetClick}
        className="text-white dark:text-[#1E253C] cursor-pointer text-sm font-medium hover:underline"
      >
        {t("forgetPassword")}
      </div>
      <>
        <CustomModal
          headerTextAlign="center"
          isRTL={isRTL}
          onOpenChange={setOpen}
          open={open}
          title={t("forgetPasswordModalTitle")}
          description={t("forgetPasswordModalDescription")}
          footer={modalFooter}
        />
      </>
    </div>
  );
};

export default ForgetPasswordModal;
