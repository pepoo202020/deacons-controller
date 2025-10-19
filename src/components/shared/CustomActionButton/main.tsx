import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface ICustomActionButtonProps {
  lightHexCode?: string;
  darkHexCode?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  Icon?: IconType;
  text: string;
  clickHandler?: () => void;
  variant: "default" | "outline" | "ghost" | "link";
}

const CustomActionButton: React.FC<ICustomActionButtonProps> = ({
  lightHexCode = "#39B1DB",
  darkHexCode = "#1D253B",
  type = "button",
  className,
  Icon,
  text,
  clickHandler,
  variant,
}) => {
  return (
    <Button
      type={type}
      className={cn(
        "w-full cursor-pointer",
        `bg-[${lightHexCode}] dark:bg-[${darkHexCode}] text-white`,
        `hover:bg-transparent border`,
        `hover:text-[${lightHexCode}] hover:dark:text-[${darkHexCode}]`,
        `hover:border-[${lightHexCode}] dark:hover:border-[${darkHexCode}]`,
        "transition-all duration-500",
        "flex items-center justify-center gap-2",
        className
      )}
      onClick={clickHandler}
      variant={variant}
    >
      {Icon && <Icon size={24} />}
      {text}
    </Button>
  );
};

export default CustomActionButton;
