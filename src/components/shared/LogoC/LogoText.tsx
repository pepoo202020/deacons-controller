import { cn } from "@/lib/utils";
import { splitTextIntoLines } from "@/services/general";

export type TLogoTextSizes = "sm" | "md" | "lg" | "xl";

interface ILogoTextProps {
  size: TLogoTextSizes;
  header: boolean;
  text: string;
  splashScreen: boolean;
}
const LogoText = ({ size, header, text, splashScreen }: ILogoTextProps) => {
  const words = text.trim().split(" ").filter(Boolean);
  let lines: string[];

  if (splashScreen) {
    lines = splitTextIntoLines(3, text);
  } else {
    if (header && words.length <= 2) {
      lines = [words.join(" ")];
    } else {
      lines = splitTextIntoLines(2, text);
    }
  }

  const sizeClass =
    size === "sm"
      ? "text-lg md:text-xl"
      : size === "lg"
      ? "text-2xl md:text-3xl"
      : "text-3xl md:text-4xl";
  console.log(lines);
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center gap-2 capitalize",
        sizeClass
      )}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}
    </div>
  );
};

export default LogoText;
