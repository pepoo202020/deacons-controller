"use client";
import LogoComponent from "@/components/shared/LogoC/main";
import { useLanguage } from "@/providers/language/LanguageProvider";
import { useIsMobile } from "@/services/hooks/useIsMobile";
import Link from "next/link";
import NotificationButton, {
  INotification,
} from "./content/NotificationButton";
import { User } from "@/generated/prisma";
import { ProfileButton } from "./content/ProfileButton";
import { useTheme } from "next-themes";

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

const user: User = {
  id: "123456",
  createdAt: new Date(),
  email: "poposhosh23@gmail.com",
  isActive: true,
  name: "Abanob Shenoda Tawfik",
  nationalityID: "29610012516535",
  password: "123456789",
  profileImage: "/images/300.jpeg",
  updatedAt: new Date(),
};

const DashboardHeader = () => {
  const { t, isRTL, language, changeLanguage } = useLanguage();
  const { isDesktop } = useIsMobile();
  const { theme, setTheme } = useTheme();
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
        <ProfileButton
          user={user}
          isRTL={isRTL}
          t={t}
          setTheme={setTheme}
          theme={theme}
          changeLanguage={changeLanguage}
          language={language}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
