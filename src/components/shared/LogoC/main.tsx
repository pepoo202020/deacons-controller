import { cn } from "@/lib/utils";
import LogoImage, { TLogoImageSizes } from "./content/LogoImage";
import LogoText, { TLogoTextSizes } from "./content/LogoText";

interface ILogoComponentProps {
  imageSize: TLogoImageSizes;
  splashScreen: boolean;
  textSize: TLogoTextSizes;
  text: string;
  header: boolean;
}

const LogoComponent = ({
  imageSize,
  splashScreen,
  textSize,
  text,
  header,
}: ILogoComponentProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        header ? "gap-1 mb-0" : "gap-5 mb-5"
      )}
    >
      {/* logo Image */}
      <LogoImage size={imageSize} splashScreen={splashScreen} />
      {/* logo text */}
      <LogoText
        header={header}
        size={textSize}
        text={text}
        splashScreen={splashScreen}
      />
    </div>
  );
};

export default LogoComponent;
