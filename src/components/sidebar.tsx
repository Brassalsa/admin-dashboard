"use client";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideBar() {
  const path = usePathname();
  return (
    <div className="sticky top-0 left-0 w-64 p-4 hidden lg:block">
      <SideBarItem href="/" title="overview" isActive={path == "/"} />
      <SideBarItem href="/people" title="people" isActive={path == "/people"} />
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
      "flex gap-1 hover:bg-muted p-2 rounded-md capitalize transition",
      isActive && "text-violet-500"
    )}
  >
    <LayoutGrid
      className={cn(
        "stroke-slate-500 dark:stroke-slate-400",
        isActive && "stroke-primary-color dark:stroke-primary-color"
      )}
    />
    {title}
  </Link>
);
