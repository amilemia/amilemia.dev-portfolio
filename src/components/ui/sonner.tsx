"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps } from "sonner";
import type { CSSProperties } from "react";

export function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  const style: CSSProperties = {
    "--normal-bg": "var(--popover)",
    "--normal-text": "var(--popover-foreground)",
    "--normal-border": "var(--border)",
  };

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={style}
      {...props}
    />
  );
}
