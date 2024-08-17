import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import usePeopleState from "@/state/people";
import userUrlQuery from "@/hooks/url-query";
import { useEffect } from "react";

export function DataTablePagination() {
  const table = usePeopleState((s) => s.table);
  const query = userUrlQuery(true);
  useEffect(() => {
    // run on first
    if (!table) return;
    const pageIndx = query.getQueryParam("page") || 1;
    const pageSize = query.getQueryParam("pagesize") || 10;

    table.setPageIndex(Number(pageIndx));
    table.setPageSize(Number(pageSize));
  }, [table]);

  useEffect(() => {
    // run on page state changes
    if (!table) return;
    const page = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    query.setQueryParams([
      { key: "page", value: page },
      { key: "pagesize", value: pageSize },
    ]);
  }, [
    table?.getState().pagination.pageIndex,
    table?.getState().pagination.pageSize,
  ]);

  if (!table) return;

  const onPageSizeChange = (value: string) => {
    table.setPageSize(Number(value));
  };

  const handlePrevPage = () => {
    table.previousPage();
  };
  const handleNextPage = () => {
    table.nextPage();
  };

  const handleFirstPage = () => {
    table.setPageIndex(0);
  };
  const handleLastPage = () => {
    table.setPageIndex(table.getPageCount() - 1);
  };

  return (
    <div className="flex items-center justify-between px-2 mt-3">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={onPageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleFirstPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePrevPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleLastPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
