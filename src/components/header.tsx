"use client";
import FloatingContainer from "./ui/floating-container";
import NavBar from "./ui/navbar";
import Logo from "./logo";
import { ModeToggle } from "./theme-toogle";
import UserUI, { UserUIImg, UserUiName } from "./user-ui";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { useUserCtx } from "./context/user-provider";

function Header() {
  const { user } = useUserCtx();
  console.log(user);
  return (
    <FloatingContainer className="min-h-14 border-b-2 bg-background mb-4 flex justify-center items-center">
      <NavBar className="h-full w-full">
        <Logo className="flex-1" />
        <ModeToggle className="scale-75 rounded-full" />
        <Button
          variant={"ghost"}
          className="size-7 rounded-full overflow-hidden p-1"
        >
          <Bell className="stroke-slate-600 dark:stroke-slate-200" />
        </Button>
        <UserUI
          email={user?.email || ""}
          name={user?.name || ""}
          className="flex gap-2"
        >
          <UserUIImg />
          <UserUiName className="text-sm" />
        </UserUI>
      </NavBar>
    </FloatingContainer>
  );
}

export default Header;
