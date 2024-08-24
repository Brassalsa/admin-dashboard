import { Button } from "@/components/ui/button";
import { PeopleCellComp, PeopleHeaderComp } from "../columns";
import { ArrowDown, ArrowUp, ArrowUpDown, Dot } from "lucide-react";
import { Status } from "@/lib/constants/user";
import Tag from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export const StatusHeader = ({ column }: PeopleHeaderComp) => {
  const asc = column.getIsSorted() === "asc";
  const desc = column.getIsSorted() === "desc";

  return (
    <button
      className="flex items-center"
      onClick={() => column.toggleSorting(asc, true)}
    >
      Status
      {asc ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : desc ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </button>
  );
};

export const StatusRow = ({ row }: PeopleCellComp) => {
  const status = Status[row.original.status as keyof typeof Status];
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
};
