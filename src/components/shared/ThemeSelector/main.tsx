import { Button } from "@/components/ui/button";
import { IoSunnySharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

interface IThemeSelectorProps {
  theme: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeSelector = ({ theme, setTheme }: IThemeSelectorProps) => {
  const handleThemeChange = () => {
    if (theme === "dark" || theme === "system") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button variant="ghost" onClick={handleThemeChange}>
      {theme === "dark" || theme === "system" ? (
        <IoSunnySharp />
      ) : (
        <MdDarkMode />
      )}
    </Button>
  );
};

export default ThemeSelector;
