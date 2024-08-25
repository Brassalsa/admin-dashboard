"use client";
import { CardHeader } from "../ui/card";
import Tag from "../ui/tag";
import useTableState from "@/state/table";
import Search from "./search";
import DataTableFilter from "./data-table-filter";
import AddMember from "./add-menber";
import DataTableVisibility from "./data-table-visibility";

function DataTableHeader() {
  const table = useTableState((s) => s.table);
  return (
    <CardHeader>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex-1 flex gap-2 shrink-0 min-w-fit justify-center md:justify-start">
          <h3 className="text-lg font-semibold">Team members</h3>{" "}
          <Tag varient="violet">
            {table?.getFilteredRowModel().rows.length} users
          </Tag>
        </div>
        <div className="ml-auto flex flex-wrap gap-2 items-center justify-center ">
          <Search />
          <DataTableFilter />
          <DataTableVisibility />
          <AddMember />
        </div>
      </div>
    </CardHeader>
  );
}

export default DataTableHeader;
