import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CustomCardHeader, {
  ICustomCardHeader,
} from "./content/CustomCardHeader";

interface ICustomCardProps extends ICustomCardHeader {
  width: "sm" | "md" | "lg" | "2xl" | "tailwind-width" | "custom";
  tailwindWidth?: string;
  customWidth?: string;
  body: React.ReactNode;
  isRTL: boolean;
}

const CustomCard: React.FC<ICustomCardProps> = ({
  width,
  tailwindWidth,
  customWidth,
  alignText,
  description,
  title,
  titleSize,
  body,
  isRTL,
}) => {
  return (
    <Card
      className={cn(
        "w-full backdrop-blur-sm bg border-yellow-400 relative z-10",
        width === "sm" && "max-w-sm",
        width === "md" && "max-w-md",
        width === "lg" && "max-w-lg",
        width === "2xl" && "max-w-2xl",
        width === "tailwind-width" && `max-w-${tailwindWidth}`,
        width === "custom" && `max-w-[${customWidth}px]`
      )}
    >
      <CustomCardHeader
        alignText={alignText}
        description={description}
        title={title}
        titleSize={titleSize}
      />
      <CardContent className="space-y-3" dir={isRTL ? "rtl" : "ltr"}>
        {body}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
