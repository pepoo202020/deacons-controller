import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ICustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headerTextAlign: "center" | "left" | "right";
  isRTL: boolean;
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

const CustomDialog: React.FC<ICustomDialogProps> = ({
  open,
  onOpenChange,
  isRTL,
  headerTextAlign,
  title,
  description,
  content,
  footer,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir={isRTL ? "rtl" : "ltr"} className="sm:max-w-md">
        <DialogHeader className={cn(`text-${headerTextAlign} text-3xl`)}>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
        {footer && (
          <DialogFooter className="justify-center sm:justify-start">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
