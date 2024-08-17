import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import usePeopleState from "@/state/people";

function DataTableVisibility() {
  const table = usePeopleState((s) => s.table);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto" size={"icon"}>
          <Eye />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table &&
          table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableVisibility;
