"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { useUserState } from "@/state/user";

function Overview() {
  const { user } = useUserState();

  return (
    <div className="flex-1">
      <Card className="w-full h-[80svh]">
        <CardContent className="py-2">
          <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        </CardContent>
      </Card>
    </div>
  );
}

export default Overview;
