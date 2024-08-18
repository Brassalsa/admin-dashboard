"use client";
import FloatingContainer from "./ui/floating-container";
import NavBar from "./ui/navbar";
import Logo from "./logo";
import { ModeToggle } from "./theme-toogle";
import UserUI, { UserUIImg, UserUiName, UserUIUserName } from "./user-ui";
import { Button } from "./ui/button";
import { Bell, MenuIcon } from "lucide-react";
import { useUserCtx } from "./context/user-provider";
import Menu, { MenuSideBarLink } from "./menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";

function Header() {
  const { user } = useUserCtx();
  const [openMenu, setOpenMenu] = useState(false);
  const trigger = () => setOpenMenu(!openMenu);
  return (
    <FloatingContainer className="min-h-14 border-b-2 bg-background/90 z-50 mb-4 flex justify-center items-center">
      <NavBar className="h-full w-full">
        <Logo className="flex-1" />
        <ModeToggle className="scale-75 rounded-full" />
        <Button
          variant={"ghost"}
          className="size-7 rounded-full overflow-hidden p-1"
        >
          <Bell className="stroke-slate-600 dark:stroke-slate-200 size-4" />
        </Button>
        <div className="sm:flex gap-2 hidden lg:hidden">
          <Menu />
        </div>
        {user && (
          <UserUI {...user} className="sm:flex gap-2 hidden">
            <UserUIImg />
            <UserUiName className="text-xs" />
          </UserUI>
        )}
        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetTrigger className="sm:hidden">
            <MenuIcon className="size-4 stroke-slate-500 dark:stroke-slate-300" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>Menu</SheetHeader>
            <SheetDescription className="flex flex-col gap-2 mt-6">
              <MenuSideBarLink onClick={trigger} href={"/"}>
                Overview
              </MenuSideBarLink>
              <MenuSideBarLink onClick={trigger} href={"/people"}>
                People
              </MenuSideBarLink>

              {user && (
                <UserUI
                  {...user}
                  className="flex gap-2 mt-auto absolute bottom-4"
                >
                  <UserUIImg className="size-12" />
                  <div>
                    <UserUiName className="text-sm text-primary" />
                    <UserUIUserName />
                  </div>
                </UserUI>
              )}
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </NavBar>
    </FloatingContainer>
  );
}

export default Header;
