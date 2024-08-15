import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

type Varient = {
  varient?: "violet" | "sky" | "blue";
};

export default function Tag({
  className,
  varient,
  ...rest
}: ComponentPropsWithoutRef<"span"> & Varient) {
  return (
    <span
      {...rest}
      className={cn(
        "inline text-xs border w-fit p-1 px-2 rounded-xl",
        getClassByVarient(varient),
        className
      )}
    />
  );
}

function getClassByVarient(varient: Varient["varient"]) {
  let className = "";
  if (!varient) return "";
  switch (varient) {
    case "blue":
      className = "text-blue-800 bg-blue-200";
      break;
    case "sky":
      className = "text-sky-800 bg-sky-200";
      break;
    default:
      className = "text-violet-800 bg-violet-200";
  }

  return className;
}
