"use client";

import { useIsMobile } from "@/services/hooks/useIsMobile";
import CustomSheet from "../CustomSheet/main";
import CustomDialog from "../CustomDialog/main";

interface ICustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headerTextAlign: "center" | "left" | "right";
  isRTL: boolean;
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

const CustomModal: React.FC<ICustomModalProps> = ({
  content,
  headerTextAlign,
  isRTL,
  onOpenChange,
  open,
  title,
  description,
  footer,
}) => {
  const { isMobile } = useIsMobile();

  return (
    <>
      {isMobile ? (
        <CustomSheet
          content={content}
          headerTextAlign={headerTextAlign}
          isRTL={isRTL}
          onOpenChange={onOpenChange}
          open={open}
          title={title}
          description={description}
          footer={footer}
        />
      ) : (
        <CustomDialog
          content={content}
          headerTextAlign={headerTextAlign}
          isRTL={isRTL}
          onOpenChange={onOpenChange}
          open={open}
          title={title}
          description={description}
          footer={footer}
        />
      )}
    </>
  );
};

export default CustomModal;
