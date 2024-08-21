import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import React, { Dispatch } from "react";
import PeopleForm from "../form";
import { User, UserWithoutInfo } from "@/types";

type Props = {
  open: boolean;
  setOpen: Dispatch<boolean>;
  onSubmit: (val: User) => void;
  user: UserWithoutInfo;
};
function EditRow({ open, setOpen, onSubmit, user }: Props) {
  const trigger = () => setOpen(!open);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-svh h-min overflow-y-auto px-6">
        <DialogTitle>Edit Teams</DialogTitle>
        <DialogDescription className="sr-only">Edit teams</DialogDescription>
        <PeopleForm
          defaultValues={user}
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

export default EditRow;
