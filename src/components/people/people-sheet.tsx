import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

import PeopleOverView from "./people-overview";
import usePeopleState from "@/state/people";

export default function PeopleSheet() {
  const { people, overView, setOverView } = usePeopleState((s) => ({
    people: s.people,
    overView: s.overView,
    setOverView: s.setOverView,
  }));
  return (
    <Sheet open={overView} onOpenChange={setOverView} modal>
      <SheetContent className="overflow-y-scroll">
        <SheetTitle className="hidden">People Overview</SheetTitle>
        <SheetDescription asChild className="text-primary">
          {people && <PeopleOverView people={people} />}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
