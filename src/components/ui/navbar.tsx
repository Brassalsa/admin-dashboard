import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

export default function NavBar(props: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      className={cn("flex gap-4 px-2 items-center min-h-full", props.className)}
    />
  );
}
