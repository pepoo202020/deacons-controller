import LogoImage, { TLogoImageSizes } from "./LogoImage";
import LogoText, { TLogoTextSizes } from "./LogoText";

interface ILogoComponentProps {
  imageSize: TLogoImageSizes;
  splashScreen: boolean;
  textSize: TLogoTextSizes;
  text: string;
}

const LogoComponent = ({
  imageSize,
  splashScreen,
  textSize,
  text,
}: ILogoComponentProps) => {
  return (
    <div className="flex items-center justify-center gap-5">
      {/* logo Image */}
      <LogoImage size={imageSize} splashScreen={splashScreen} />
      {/* logo text */}
      <LogoText
        header
        size={textSize}
        text={text}
        splashScreen={splashScreen}
      />
    </div>
  );
};

export default LogoComponent;
