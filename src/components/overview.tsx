"use client";
import React from "react";
import { useUserCtx } from "./context/user-provider";
import { Card, CardContent } from "./ui/card";

function Overview() {
  const { user } = useUserCtx();

  return (
    <div>
      <Card className="min-w-[80svw] h-[80svh]">
        <CardContent className="py-2">
          <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        </CardContent>
      </Card>
    </div>
  );
}

export default Overview;
