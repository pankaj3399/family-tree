import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export const DesktopToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="justify-start py-5 h-5 hidden lg:flex"
    >
      <div className="flex gap-2 dark:hidden md:px-0 ">
        <Moon className="h-5 w-5" />
      </div>

      <div className="dark:flex gap-2 hidden md:px-0">
        <Sun className="h-5 w-5" />
      </div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export const MobileToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="justify-start py-5 h-5"
    >
      <div className="flex gap-2 dark:hidden md:px-0 ">
        <Moon className="h-5 w-5" />
        <span className="block"> Dark </span>
      </div>

      <div className="dark:flex gap-2 hidden md:px-0">
        <Sun className="h-5 w-5" />
        <span className="block"> Light </span>
      </div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
