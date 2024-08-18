"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePeopleState from "@/state/people";
import { MoreHorizontal } from "lucide-react";
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              usePeopleState.setState({
                people: row.original,
                edit: true,
              });
              setEditDialog(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDelDialog(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteRow
        open={delDialog}
        setOpen={setDelDialog}
        onSubmit={() => {
          usePeopleState.getState().deletePeopleFromList(row.original.id);
        }}
      />
      <EditRow
        open={editDialog}
        setOpen={setEditDialog}
        onSubmit={(val) => {
          usePeopleState.getState().addPeopleToList({
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
