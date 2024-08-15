"use client";
import React from "react";
import { useUserCtx } from "./context/user-provider";

function Overview() {
  const { user } = useUserCtx();

  return (
    <div className="h-svh">
      <h1 className="text-xl">Welcome, {user?.name}</h1>
    </div>
  );
}

export default Overview;
