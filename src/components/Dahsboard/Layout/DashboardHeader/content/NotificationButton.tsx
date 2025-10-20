"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoIosNotifications } from "react-icons/io";
import NotificationCard from "./NotificationCard";

export interface INotification {
  id: string;
  title: string;
  description: string;
  from: string;
  date: Date;
  isReded: boolean;
}

interface INotificationButtonProps {
  notifications: INotification[];
  isRTL: boolean;
  t: (key: string, options?: Record<string, unknown> | undefined) => string;
}

const NotificationButton: React.FC<INotificationButtonProps> = ({
  notifications,
  isRTL,
  t,
}) => {
  const notRededNotifications = notifications
    .filter((notification) => notification.isReded === false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const rededNotifications = notifications
    .filter((notification) => notification.isReded === true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleReadNotification = (id: string) => {};

  const wholeNotifications = [...notRededNotifications, ...rededNotifications];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="lg" className="relative">
          <IoIosNotifications />
          {notRededNotifications.length > 0 && (
            <div className="bg-red-500 text-white text-[10px] flex items-center justify-center w-3 h-3 rounded-full absolute top-2 end-3">
              {notRededNotifications.length}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side={isRTL ? "left" : "right"} dir={isRTL ? "rtl" : "ltr"}>
        <SheetHeader className="text-start shadow">
          <SheetTitle>{t("notificationsTitle")}</SheetTitle>
        </SheetHeader>
        {wholeNotifications.length > 0 ? (
          <div className="flex flex-col items-start justify-start gap-1">
            {wholeNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                t={t}
                onReadNotification={handleReadNotification}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-400 flex items-center justify-center">
            {t("noNotifications")}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationButton;
