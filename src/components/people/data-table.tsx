"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { useEffect, useState } from "react";
import DataTableVisibility from "./data-table-visibility";
import useTableState from "@/state/table";
import DataTableHeader from "./data-table-header";
import { User } from "@/types";

export interface DataTableProps<TValue> {
  columns: ColumnDef<User, TValue>[];
  data: User[];
  onRowClick: (rawData: User) => void;
}

function DataTable<TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TValue>) {
  // sorting state
  const [sorting, setSorting] = useState<SortingState>([]);
  // search state
  const [globalFilter, setGlobalFilter] = useTableState((s) => [
    s.searchVal,
    s.setSearchVal,
  ]);
  // visibility state
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // filter state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // run on first render
  useEffect(() => {
    useTableState.setState({
      table,
      initialTableState: table.getState(),
    });
  }, [table]);

  return (
    <>
      {/* Table */}
      <div className="rounded-md border">
        <DataTableHeader />
        <Table className="border-t border-b">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:cursor-pointer"
                  onClick={() => onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/*Pagination */}
        <div className="px-2 py-3">
          <DataTablePagination />
        </div>
      </div>
    </>
  );
}

export default DataTable;
