"use client";
import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

function ContextProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default ContextProvider;
