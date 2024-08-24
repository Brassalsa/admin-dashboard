import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import PeopleForm from "./form";
import { usePeopleListState } from "@/state/people";
import { useState } from "react";
import { User } from "@/types";

export default function AddMember() {
  const [open, setOpen] = useState(false);
  const trigger = () => setOpen(!open);
  const onSubmit = (val: User) => {
    const people = usePeopleListState.getState().peopleList;
    usePeopleListState.getState().setPeopleList([
      {
        ...val,
        id: "@" + val.email.split(",")[0],
      },
      ...people,
    ]);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="scale-90" />
          <span>Add Members</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-svh h-min overflow-y-auto px-6">
        <DialogTitle>Add Teams</DialogTitle>
        <DialogDescription className="sr-only">
          add teams to people list
        </DialogDescription>
        <PeopleForm
          defaultValues={{
            email: "",
            id: "",
            name: "",
            role: "",
            status: "",
            teams: [],
          }}
          onSubmit={(data) => {
            onSubmit(data);
            trigger();
          }}
          onCancel={trigger}
        />
      </DialogContent>
    </Dialog>
  );
}
