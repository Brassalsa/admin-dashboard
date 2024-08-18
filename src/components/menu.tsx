import { PropsDefault } from "@/types";
import React, { ComponentPropsWithoutRef } from "react";
import FancyLink from "./ui/fancy-link";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

export default function Menu() {
  return (
    <>
      <MenuItemLink href={"/"}>OverView</MenuItemLink>
      <MenuItemLink href={"/people"}>People</MenuItemLink>
    </>
  );
}

export function MenuItemLink(props: PropsDefault & { href: string }) {
  return <FancyLink {...props} />;
}

export function MenuSideBarLink(
  props: PropsDefault & { href: string } & ComponentPropsWithoutRef<"a">
) {
  return (
    <>
      <Link
        {...props}
        className={cn(
          "hover:bg-muted w-full p-1 text-base hover:text-primary rounded-md px-2",
          props.className
        )}
      />
      <Separator className="-mt-1" />
    </>
  );
}
