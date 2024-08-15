"use client";
import React, { PropsWithChildren } from "react";
import UserProvider from "./user-provider";
import { ThemeProvider } from "./theme-provider";

function ContextProvider({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </UserProvider>
  );
}

export default ContextProvider;
