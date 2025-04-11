"use client";

import SimpleTooltip from "@/components/simple-tooltip";
import { Button } from "@/components/ui/button";
import { capitalizeWords } from "@/lib/string";
import { cn } from "@/lib/utils";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme, UseThemeProps } from "next-themes";
import { ReactElement, useEffect, useState } from "react";

const themes = {
  system: <Monitor className="w-4 h-4" />,
  dark: <MoonStar className="w-4 h-4" />,
  light: <Sun className="w-4 h-4" />,
};

/**
 * The theme switcher component.
 *
 * @return the switcher jsx
 */
const ThemeSwitcher = (): ReactElement => {
  const [mounted, setMounted] = useState(false);
  const { theme: activeTheme, setTheme }: UseThemeProps = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-fit p-1 flex gap-1.5 bg-gray-600/5 dark:bg-black/30 ring-1 light:ring-inset ring-gray-600/5 dark:ring-white/5 rounded-full">
      {Object.entries(themes).map(([theme, icon]) => {
        const active: boolean = mounted && theme === activeTheme;
        return (
          <SimpleTooltip
            key={theme}
            content={`${capitalizeWords(theme)} Theme`}
          >
            <Button
              className={cn(
                "p-1 h-6 opacity-80 rounded-full",
                active &&
                  "ring-1 bg-white dark:bg-zinc-900 ring-gray-900/10 dark:ring-white/15 hover:bg-white dark:hover:bg-zinc-900 opacity-100"
              )}
              variant="ghost"
              onClick={() => setTheme(theme)}
            >
              {icon}
            </Button>
          </SimpleTooltip>
        );
      })}
    </div>
  );
};
export default ThemeSwitcher;
