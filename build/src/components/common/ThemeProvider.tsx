"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

/**
 * Wraps the app in next-themes. We toggle the `class` attribute on <html>
 * (`.dark`) so the Tailwind v4 `dark` custom-variant and our CSS token sets
 * switch together.
 *
 * Light is the default (the original design); the choice is persisted to
 * localStorage (next-themes key "theme") so it survives reloads.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
