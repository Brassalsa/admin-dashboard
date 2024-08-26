"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { PropsWIthClassName } from "@/types";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: PropsWIthClassName) {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("relative overflow-hidden", className)}
    >
      <SunIcon className="absolute size-[1.2rem] transition-all translate-x-0 dark:translate-x-10 duration-300" />
      <MoonIcon className="absolute size-[1.2rem] transition-all -translate-x-10 dark:translate-x-0 duration-300" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
