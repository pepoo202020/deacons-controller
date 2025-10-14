import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SupportedLanguage } from "@/providers/language/LanguageProvider";
import { IconType } from "react-icons";
import { FaFlag } from "react-icons/fa";
import { FaFlagUsa } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";

interface ILanguageSelectorProps {
  isRTL: boolean;
  t: (key: string, options?: Record<string, unknown> | undefined) => string;
  changeLanguage: (language: SupportedLanguage) => Promise<void>;
}

interface ILanguageSelectorItem {
  id: number;
  name: string;
  icon: IconType;
  click: () => void;
  isActive: boolean;
}

const LanguageSelector = ({
  isRTL,
  t,
  changeLanguage,
}: ILanguageSelectorProps) => {
  const languageSelectorOptions: ILanguageSelectorItem[] = [
    {
      id: 1,
      name: t("arabicLang"),
      icon: FaFlag,
      click: () => changeLanguage("ar"),
      isActive: isRTL ? true : false,
    },
    {
      id: 2,
      name: t("englishLang"),
      icon: FaFlagUsa,
      click: () => changeLanguage("en"),
      isActive: isRTL ? false : true,
    },
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <MdLanguage />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        dir={isRTL ? "rtl" : "ltr"}
        align="start"
        className="w-40 space-y-2"
      >
        {languageSelectorOptions.map((languageSelector) => (
          <div
            key={languageSelector.id}
            className={cn(
              "w-full flex items-center justify-start gap-2",
              languageSelector.isActive
                ? "cursor-auto text-yellow-700 dark:text-yellow-200"
                : "cursor-pointer"
            )}
            onClick={() => languageSelector.click()}
          >
            <languageSelector.icon size={18} />
            <p className="text-sm">{languageSelector.name}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
