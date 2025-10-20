import { cn } from "@/lib/utils";
import { INotification } from "./NotificationButton";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface INotificationCardProps {
  notification: INotification;
  t: (key: string, options?: Record<string, unknown> | undefined) => string;
  onReadNotification: (id: string) => void;
}

const NotificationCard: React.FC<INotificationCardProps> = ({
  notification,
  t,
  onReadNotification,
}) => {
  const notificationDate = new Date(notification.date);
  return (
    <div
      className="w-full h-auto relative"
      onClick={() => onReadNotification(notification.id)}
    >
      <div
        className={cn(
          notification.isReded
            ? "bg-slate-900  text-white"
            : "bg-white dark:bg-blue-500",
          "py-1 px-3 hover:shadow-xl transition duration-100 ease-linear"
        )}
      >
        <div className="w-full flex items-center justify-between">
          {/* data */}
          <div className="flex-1 flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer">
            <div className="relative flex flex-shrink-0 items-end">
              {/* image */}
              <div className="w-16 h-16 rounded-full relative">
                {/* user profile image */}
                <Image
                  src="/images/300.jpeg"
                  alt={`image of ${notification.from}`}
                  fill
                  className="rounded-full"
                />
                {/* user is current open or not */}
                <span className="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span>
              </div>
              <div className="ml-3">
                <span className="font-semibold tracking-tight text-xs">
                  {notification.from}
                </span>
                <span className="text-xs leading-none opacity-50 px-2">
                  {`${notificationDate.getDate()} - ${notificationDate.getMonth()} - ${notificationDate.getFullYear()}`}
                </span>
                <p className="text-xs leading-4 pt-2 italic opacity-70">
                  {notification.description}
                </p>
                <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">
                  {t("from")} {notification.from}
                </span>
              </div>
            </div>
          </div>
          {/* actions */}
          <div className="w-20 flex flex-col items-center justify-center gap-2">
            <FaCheck
              size={15}
              className="cursor-pointer hover:text-green-500"
            />
            <MdDeleteForever
              size={15}
              className="cursor-pointer hover:text-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
