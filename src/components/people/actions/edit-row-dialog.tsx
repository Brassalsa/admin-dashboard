import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
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
      <DialogContent className="">
        <DialogHeader>Edit Teams</DialogHeader>
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
