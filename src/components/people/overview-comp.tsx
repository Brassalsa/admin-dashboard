"use client";
import { useOverViewState } from "@/state/people";
import React from "react";
import PeopleOverView from "./people-overview";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

function OverviewComp() {
  const { people, open, setOpen } = useOverViewState((s) => ({
    people: s.people,
    open: s.open,
    setOpen: s.setOpen,
  }));

  return (
    <div
      className={cn(
        " fixed top-0 pt-[70px] pl-2 right-0 bg-background rounded-md shrink-0 flex-1 max-w-[600px] h-full transition",
        open ? "translate-x-0" : "translate-x-[100%]"
      )}
    >
      {people && (
        <div className="relative">
          <PeopleOverView
            people={people}
            className="min-h-[calc(100svh-100px)]"
          />
          <button
            className="absolute top-1 right-1 text-white group"
            onClick={() => setOpen(false)}
          >
            <X className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}

export default OverviewComp;
