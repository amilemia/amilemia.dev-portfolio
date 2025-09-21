"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";
import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const Toaster = ({
  position = "top-center",
  ...props
}: ToasterProps) => {
  const { theme: currentTheme } = useTheme();

  return (
    <SonnerToaster
      position={position}
      theme={currentTheme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground",
            "group-[.toaster]:pointer-events-auto group-[.toaster]:flex group-[.toaster]:w-full",
            "group-[.toaster]:items-center group-[.toaster]:justify-between",
            "group-[.toaster]:space-x-4 group-[.toaster]:overflow-hidden",
            "group-[.toaster]:rounded-md group-[.toaster]:border group-[.toaster]:p-4",
            "group-[.toaster]:shadow-lg"
          ),
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

