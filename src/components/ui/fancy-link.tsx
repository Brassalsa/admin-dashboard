"use client";
import { cn } from "@/lib/utils";
import { PropsDefault } from "@/types";
import Link from "next/link";

function FancyLink(props: PropsDefault & { href: string }) {
  return (
    <Link
      {...props}
      className={cn(
        "overflow-hidden text-xs group hover:opacity-100 transition-opacity text-primary-color",
        props.className
      )}
    >
      {props.children}
      <div className="w-full border border-primary-color translate-x-[-100%] group-hover:translate-x-0 transition " />
    </Link>
  );
}

export default FancyLink;
