import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import useTableState from "@/state/table";

function DataTableVisibility() {
  const table = useTableState((s) => s.table);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto" size={"icon"}>
          <Eye className="size-6 stroke-slate-500 dark:stroke-slate-300" />
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
