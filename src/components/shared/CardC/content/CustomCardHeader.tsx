import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ICustomCardHeader {
  title: string;
  description: string;
  alignText: "center" | "left" | "right";
  titleSize: "md" | "lg" | "xl" | "2xl" | "3xl" | "5xl";
}

const CustomCardHeader: React.FC<ICustomCardHeader> = ({
  title,
  description,
  alignText,
  titleSize,
}) => {
  return (
    <CardHeader className={cn("space-y-1", `text-${alignText}`)}>
      <CardTitle className={cn("font-bold", `text-${titleSize}`)}>
        {title}
      </CardTitle>
      <CardDescription className="text-white/70 dark:text-[#1E253C] font-semibold">
        {description}
      </CardDescription>
    </CardHeader>
  );
};

export default CustomCardHeader;
