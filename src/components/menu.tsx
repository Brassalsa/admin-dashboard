import { PropsDefault } from "@/types";
import React from "react";
import FancyLink from "./ui/fancy-link";

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
