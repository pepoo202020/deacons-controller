"use client";
import LogoComponent from "@/components/shared/LogoC/main";
import { useLanguage } from "@/providers/language/LanguageProvider";
import { useIsMobile } from "@/services/hooks/useIsMobile";
import Link from "next/link";
import NotificationButton, {
  INotification,
} from "./content/NotificationButton";

const notifications: INotification[] = [
  {
    id: "1",
    title: "notify 1",
    description: "notify description 1",
    from: "user 1",
    date: new Date(),
    isReded: true,
  },
  {
    id: "2",
    title: "notify 2",
    description: "notify description 2",
    from: "user 2",
    date: new Date(),
    isReded: false,
  },
  {
    id: "3",
    title: "notify 3",
    description: "notify description 3",
    from: "user 3",
    date: new Date(),
    isReded: false,
  },
  {
    id: "4",
    title: "notify 4",
    description: "notify description 4",
    from: "user 4",
    date: new Date(),
    isReded: false,
  },
  {
    id: "5",
    title: "notify 5",
    description: "notify description 5",
    from: "user 5",
    date: new Date(),
    isReded: true,
  },
];

const DashboardHeader = () => {
  const { t, isRTL } = useLanguage();
  const { isDesktop } = useIsMobile();
  return (
    <div className="flex items-center px-5 md:px-0 justify-between w-full max-w-7xl h-20 shadow">
      {/* logo */}
      <Link href={"/dashboard"} className="">
        <LogoComponent
          header
          imageSize="sm"
          splashScreen={false}
          text={t("appName")}
          textSize="sm"
        />
      </Link>
      <div className="flex items-center justify-end gap-2">
        {/* notification */}
        {!isDesktop && (
          <NotificationButton
            notifications={notifications}
            isRTL={isRTL}
            t={t}
          />
        )}
        {/* profile */}
      </div>
    </div>
  );
};

export default DashboardHeader;
