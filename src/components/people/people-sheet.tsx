"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

import PeopleOverView from "./people-overview";
import { useOverViewState } from "@/state/people";

export default function PeopleSheet() {
  const { people, open, setOpen } = useOverViewState((s) => ({
    people: s.people,
    open: s.open,
    setOpen: s.setOpen,
  }));

  return (
    <Sheet open={open} onOpenChange={setOpen} modal>
      <SheetContent className="overflow-y-scroll">
        <SheetTitle className="hidden">People Overview</SheetTitle>
        <SheetDescription asChild className="text-primary">
          {people && <PeopleOverView people={people} />}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
