"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics/track";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun, testId: "theme-light" },
  { value: "dark", label: "Dark", icon: Moon, testId: "theme-dark" },
  { value: "system", label: "System", icon: Laptop, testId: "theme-system" },
] as const;

type ThemeValue = (typeof OPTIONS)[number]["value"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (value: string) => {
    const newTheme = value as ThemeValue;
    setTheme(newTheme);
    track("Theme: Change", { theme: newTheme });
  };

  const current = mounted && theme ? theme : "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-9"
          aria-label="Toggle theme"
          data-testid="theme-toggle"
        >
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuRadioGroup value={current} onValueChange={handleChange}>
          {OPTIONS.map(({ value, label, icon: Icon, testId }) => (
            <DropdownMenuRadioItem key={value} value={value} data-testid={testId}>
              <Icon className="size-4" aria-hidden />
              <span>{label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


