"use client";
import { cn } from "@/lib/utils";
import { PropsDefault, PropsWIthClassName, User } from "@/types";
import Image from "next/image";
import React, { createContext, useContext, useEffect, useState } from "react";

type CtxProps = {
  image?: User["image"];
  name: User["name"];
  email: User["email"];
  id: User["id"];
};

const UserCtx = createContext<CtxProps | null>(null);
const useUserCtx = () => {
  const ctx = useContext(UserCtx);
  if (!ctx) {
    throw new Error("useUserCtx must be used inside UserUI");
  }
  return ctx;
};

export default function UserUI({
  children,
  className,
  ...rest
}: CtxProps & PropsDefault) {
  return (
    <UserCtx.Provider value={rest}>
      <div className={cn("flex gap-2 items-center", className)}>
        {children || <DefaultUserUi />}
      </div>
    </UserCtx.Provider>
  );
}

const DefaultUserUi = () => (
  <>
    <UserUIImg />
    <div className="flex flex-col">
      <UserUiName />
      <UserUIUserName />
    </div>
  </>
);

export function UserUIImg({ className }: PropsWIthClassName) {
  const { image, name } = useUserCtx();
  const initial = image || "/svg/user.svg";
  const [imgSrc, setImgSrc] = useState(initial);

  useEffect(() => {
    setImgSrc(initial);
  }, [initial]);

  return (
    <div
      className={cn(
        "relative size-8 border rounded-full overflow-hidden shadow-sm",
        className
      )}
    >
      <Image
        src={imgSrc}
        alt={`${name}-img`}
        onError={() => setImgSrc("/svg/user.svg")}
        fill
        sizes="100px"
      />
    </div>
  );
}

export function UserUiName({ className }: PropsWIthClassName) {
  const { name } = useUserCtx();
  return <div className={cn("", className)}>{name}</div>;
}

export function UserUIUserName({ className }: PropsWIthClassName) {
  const { id } = useUserCtx();
  return <div className={cn("", className)}>{id}</div>;
}
