"use client";
import type { Dispatch } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: Dispatch<boolean>;
  onSubmit: () => void;
};
function DeleteRow({ open, setOpen, onSubmit }: Props) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="relative">
            <DialogTitle>Delete Member Details</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the Member details? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                onSubmit();
                setOpen(false);
              }}
              type="submit"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteRow;
