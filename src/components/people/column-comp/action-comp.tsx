"use client";

import { Button } from "@/components/ui/button";

import { usePeopleListState, usePeopleState } from "@/state/people";
import { type LucideIcon, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteRow from "../actions/delete-row-dialog";
import EditRow from "../actions/edit-row-dialog";
import { Row } from "@tanstack/react-table";
import { User } from "@/types";

const ActionsComp = ({ row }: { row: Row<User> }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [delDialog, setDelDialog] = useState(false);
  return (
    <span className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="flex gap-2">
        <ActionBtn
          onClick={() => {
            setDelDialog(true);
          }}
          Icon={Trash2}
        />
        <ActionBtn
          onClick={() => {
            usePeopleState.setState({
              people: row.original,
            });
            setEditDialog(true);
          }}
          Icon={Pencil}
        />
      </div>
      <DeleteRow
        open={delDialog}
        setOpen={setDelDialog}
        onSubmit={() => {
          usePeopleListState.getState().deletePeopleFromList(row.original.id);
        }}
      />
      <EditRow
        open={editDialog}
        setOpen={setEditDialog}
        onSubmit={(val) => {
          usePeopleListState.getState().addPeopleToList({
            ...val,
            id: "@" + val.email.split("@")[0],
          });
        }}
        user={row.original}
      />
    </span>
  );
};

export default ActionsComp;

type BtnProps = {
  onClick?: () => void;
  Icon: LucideIcon;
};
const ActionBtn = ({ onClick, Icon }: BtnProps) => (
  <Button onClick={onClick} size={"icon"} variant={"ghost"}>
    <Icon className="stroke-slate-600 dark:stroke-slate-400 size-5" />
  </Button>
);
