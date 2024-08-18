import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

type Varient = {
  varient?: "violet" | "sky" | "blue" | "pink";
};
const globVarients: Varient["varient"][] = ["blue", "pink", "sky", "violet"];

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
      className =
        "text-blue-800 bg-blue-200 dark:bg-blue-200 dark:text-blue-800";
      break;
    case "sky":
      className = "text-sky-800 bg-sky-200 dark:bg-sky-800 dark:text-sky-200";
      break;
    case "pink":
      className =
        "text-pink-800 bg-pink-200 dark:bg-pink-800 dark:text-pink-200";

    default:
      className =
        "text-violet-800 bg-violet-200 dark:bg-violet-800 dark:text-violet-200";
  }

  return className;
}

export function getVarientsFromArr() {
  let vrrr = [...globVarients];
  return () => {
    if (vrrr.length === 0) {
      vrrr = [...globVarients];
    }
    return vrrr.pop() as Varient["varient"];
  };
}
