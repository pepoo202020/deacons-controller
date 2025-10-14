import { cn } from "@/lib/utils";

export type TLogoImageSizes = "sm" | "lg" | "xl";

interface ILogoImageProps {
  size: TLogoImageSizes;
  splashScreen: boolean;
}

const LogoImage = ({ size, splashScreen }: ILogoImageProps) => {
  return (
    <div
      className={cn(
        splashScreen
          ? "bg-[url(/images/dark-logo.png)]"
          : "bg-[url(/light-logo.jpg)] dark:bg-[url(/dark-logo.png)]",
        size === "sm" ? "w-10 h-10" : size === "lg" ? "w-28 h-28" : "w-32 h-32",
        "bg-center bg-contain bg-no-repeat"
      )}
    />
  );
};

export default LogoImage;
