"use client";
import { cn } from "@/lib/utils";
import useHeaderState from "@/state/header";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideBar() {
  const path = usePathname();
  const visible = useHeaderState((s) => s.visible);
  return (
    <div className="w-64 p-4 hidden lg:block">
      <div
        className={cn(
          "fixed top-4 transition-all duration-300",
          visible ? "top-20" : ""
        )}
      >
        <SideBarItem href="/" title="overview" isActive={path == "/"} />
        <SideBarItem
          href="/people"
          title="people dictionary"
          isActive={path == "/people"}
        />
      </div>
    </div>
  );
}
export default SideBar;

type Props = {
  title: string;
  isActive?: boolean;
  href: string;
};
const SideBarItem = ({ title, isActive, href }: Props) => (
  <Link
    href={href}
    className={cn(
      "flex gap-1 hover:bg-muted p-2 rounded-md capitalize transition ",
      isActive && "text-violet-500"
    )}
  >
    <div
      className={cn(
        "size-6 bg-primary rounded-md flex justify-center items-center",
        isActive && "bg-primary-color "
      )}
    >
      <LayoutGrid
        className={cn(
          "fill-background bg-primary rounded-sm stroke-background size-4",
          isActive && "bg-primary-color "
        )}
      />
    </div>
    {title}
  </Link>
);
