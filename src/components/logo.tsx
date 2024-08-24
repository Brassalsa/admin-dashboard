import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

function Logo(props: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={cn(
        "text-3xl text-primary-color font-semibold",
        props.className
      )}
    >
      People.co
    </span>
  );
}

export default Logo;
