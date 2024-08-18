"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
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
import usePeopleState from "@/state/people";
import DataTableVisibility from "./data-table-visibility";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick: (rawData: TData) => void;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) => {
  // sorting state
  const [sorting, setSorting] = useState<SortingState>([]);
  // search state
  const [globalFilter, setGlobalFilter] = useState("");
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

  // run
  useEffect(() => {
    usePeopleState.setState({
      table,
      initialTableState: table.getState(),
      searchVal: globalFilter,
      setSearchVal: setGlobalFilter,
    });
  }, [table, globalFilter, setGlobalFilter]);

  return (
    <>
      <div className="flex gap-1 justify-end mb-1">
        <DataTableVisibility />
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
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
      </div>

      {/*Pagination */}
      <DataTablePagination />
    </>
  );
};

export default DataTable;
