import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ICustomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headerTextAlign: "center" | "left" | "right";
  isRTL: boolean;
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

const CustomSheet: React.FC<ICustomSheetProps> = ({
  open,
  content,
  headerTextAlign,
  isRTL,
  onOpenChange,
  title,
  description,
  footer,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <SheetHeader className={cn(`text-${headerTextAlign}`)}>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {content}
        {footer && (
          <SheetFooter className="justify-center w-full">{footer}</SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
