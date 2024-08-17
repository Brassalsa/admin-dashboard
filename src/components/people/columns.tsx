"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import UserUI, { UserUIImg, UserUiName, UserUIUserName } from "../user-ui";
import Tag from "../ui/tag";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Dot,
  MoreHorizontal,
} from "lucide-react";
import { Status } from "@/lib/constants/user";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import usePeopleState from "@/state/people";
import DeleteRow from "./actions/delete-row-dialog";
import { useState } from "react";

type People = User;

export const columns: ColumnDef<People>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      const asc = column.getIsSorted() === "asc";
      const desc = column.getIsSorted() === "desc";
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(asc, true)}>
          Name
          {asc ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : desc ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      const handleClick = () => {
        usePeopleState.setState({
          people: user,
          overView: true,
        });
      };
      return (
        <span onClick={handleClick}>
          <UserUI {...user}>
            <UserUIImg className="shrink-0" />
            <div className="flex flex-col gap-0">
              <UserUiName className="text-sm" />
              <UserUIUserName className="text-muted-foreground text-xs" />
            </div>
          </UserUI>
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const asc = column.getIsSorted() === "asc";
      const desc = column.getIsSorted() === "desc";

      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(asc, true)}>
          Status
          {asc ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : desc ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      const isActive = status === Status.Active;
      return (
        <Tag className="flex gap-0 items-center p-0">
          <Dot
            className={cn(
              "size-fit -translate-x-1",
              isActive ? "text-green-500" : "text-red-500"
            )}
          />
          <span className="-translate-x-2">{status}</span>
        </Tag>
      );
    },
  },
  {
    accessorKey: "role",
    filterFn: "arrIncludesSome",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "teams",
    filterFn: "arrIncludesSome",
    header: "Teams",
    cell: ({ row }) => {
      return row.original.teams.map((i) => (
        <Tag key={i} className="mr-1">
          {i}
        </Tag>
      ));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [delDialog, setDelDialog] = useState(false);
      return (
        <>
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
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDelDialog(true)}>
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
        </>
      );
    },
  },
];
