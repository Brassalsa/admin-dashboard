import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import PeopleForm from "./form";
import { generateUser } from "@/lib/utils/user";
import usePeopleState from "@/state/people";
import { useState } from "react";
import { User } from "@/types";

export default function AddMember() {
  const [open, setOpen] = useState(false);
  const trigger = () => setOpen(!open);
  const onSubmit = (val: User) => {
    const people = usePeopleState.getState().peopleList;
    usePeopleState.getState().setPeopleList([
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
        <Button className="bg-violet-500 text-violet-50 hover:bg-violet-400">
          <Plus className="scale-90" />
          <span>Add Members</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>Add Teams</DialogHeader>
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
