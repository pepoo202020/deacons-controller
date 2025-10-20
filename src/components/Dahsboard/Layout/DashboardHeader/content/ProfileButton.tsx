import CustomAvatar from "@/components/shared/CustomAvatar/main";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/generated/prisma";
import { SupportedLanguage } from "@/providers/language/LanguageProvider";
import { ageCalculatorFromNationalityID } from "@/services/general";
import { IconType } from "react-icons";
import { FaFlag, FaFlagUsa } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import { MdDarkMode, MdMenu } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";

interface IProfileButtonProps {
  user: User;
  isRTL: boolean;
  t: (key: string, options?: Record<string, unknown> | undefined) => string;
  theme: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  language: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => Promise<void>;
}

interface IDropdownMenuItem {
  id: number;
  title: string;
  action: () => void;
  icon: IconType;
}

export const ProfileButton: React.FC<IProfileButtonProps> = ({
  user,
  isRTL,
  t,
  setTheme,
  theme,
  language,
  changeLanguage,
}) => {
  const nameCharacters = user.name
    .split(" ")
    .map((character) => character.charAt(0))
    .slice(0, 2);

  const handleThemeChange = () => {
    if (theme === "dark" || theme === "system") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleLangChange = () => {
    if (language === "ar") {
      changeLanguage("en");
    } else {
      changeLanguage("ar");
    }
  };

  const dropdownMenuItems: IDropdownMenuItem[] = [
    { id: 1, title: t("viewProfile"), action: () => {}, icon: RiProfileLine },
    {
      id: 2,
      title: language === "ar" ? t("englishLang") : t("arabicLang"),
      action: handleLangChange,
      icon: language === "ar" ? FaFlag : FaFlagUsa,
    },
    {
      id: 3,
      title:
        theme === "dark" || theme === "system"
          ? t("lightTheme")
          : t("darkTheme"),
      action: handleThemeChange,
      icon: theme === "dark" || theme === "system" ? IoSunnySharp : MdDarkMode,
    },
    { id: 4, title: t("logout"), action: () => {}, icon: IoMdLogOut },
  ];
  return (
    <DropdownMenu dir={isRTL ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent flex items-center justify-center gap-1 hover:bg-transparent cursor-pointer border rounded-2xl text-black dark:text-white hover:border-blue-800">
          {/* profile image */}
          <CustomAvatar
            alt={user.name}
            borderColor="blue"
            fallback={nameCharacters}
            image={user.profileImage ?? ""}
            size="25"
          />
          {/* bars */}
          <MdMenu size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-md">
        <DropdownMenuLabel className="text-center">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ({ageCalculatorFromNationalityID(user.nationalityID)?.age}{" "}
            {t("year")})
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownMenuItems.map((item) => (
          <DropdownMenuItem key={item.id} onClick={item.action}>
            <item.icon size={24} />
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
