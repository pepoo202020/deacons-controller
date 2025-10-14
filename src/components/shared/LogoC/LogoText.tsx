import { cn } from "@/lib/utils";

export type TLogoTextSizes = "sm" | "md" | "lg" | "xl";

interface ILogoTextProps {
  size: TLogoTextSizes;
  header: boolean;
  text: string;
  splashScreen: boolean;
}
const LogoText = ({ size, header, text, splashScreen }: ILogoTextProps) => {
  const words = text.trim().split(" ").filter(Boolean);
  const splitIntoLines = (n: number) => {
    const lines: string[][] = Array.from({ length: n }, () => []);
    const lineChars = new Array(n).fill(0);
    for (const w of words) {
      let idx = 0;
      for (let i = 1; i < n; i++) {
        if (lineChars[i] < lineChars[idx]) idx = i;
      }
      lines[idx].push(w);
      lineChars[idx] += w.length + 1;
    }
    return lines.map((l) => l.join(" "));
  };
  let lines: string[];

  if (splashScreen) {
    lines = splitIntoLines(3);
  } else {
    if (header && words.length <= 2) {
      lines = [words.join(" ")];
    } else {
      lines = splitIntoLines(2);
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
