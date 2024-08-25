import { Button } from "../ui/button";
import useUrlQuery from "@/hooks/url-query";
import { ComponentPropsWithoutRef, useCallback, useEffect } from "react";
import useTableState from "@/state/table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function DataTablePagination() {
  const table = useTableState((s) => s.table);
  const query = useUrlQuery(true);
  useEffect(() => {
    // run on first
    if (!table) return;
    const pageIndx = query.getQueryParam("page") || 1;
    table.setPageIndex(Number(pageIndx));
  }, [table]);

  useEffect(() => {
    // run on page state changes
    if (!table) return;
    const page = table.getState().pagination.pageIndex;
    query.setQueryParams([{ key: "page", value: page }]);
  }, [table?.getState().pagination.pageIndex]);

  if (!table) return;

  const handlePrevPage = () => {
    table.previousPage();
  };
  const handleNextPage = () => {
    table.nextPage();
  };

  const handlePageNavigation = (pageInd: number) => {
    table.setPageIndex(pageInd);
  };

  return (
    <div className="flex gap-2 flex-wrap mt-2 w-full justify-between">
      <Button
        variant={"outline"}
        className="capitalize gap-2 border-2 rounded-lg"
        onClick={handlePrevPage}
        disabled={!table.getCanPreviousPage()}
      >
        <ArrowLeft />
        <span>Previous</span>
      </Button>
      <PageNums
        length={table.getPageCount()}
        onValueChange={handlePageNavigation}
        currentInd={table.getState().pagination.pageIndex}
      />
      <Button
        variant={"outline"}
        className="capitalize gap-2  border-2 rounded-lg"
        onClick={handleNextPage}
        disabled={!table.getCanNextPage()}
      >
        <span>Next</span>
        <ArrowRight />
      </Button>
    </div>
  );
}

type Props = ComponentPropsWithoutRef<"div"> & {
  onValueChange: (val: number) => void;
  length: number;
  currentInd: number;
};

function PageNums({ length, onValueChange, currentInd, ...rest }: Props) {
  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(2, currentInd - 1);
    const end = Math.min(length - 1, currentInd + 3);

    if (start > 2) {
      range.push("...");
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < length - 1) {
      range.push("...");
    }

    return [1, ...range, length];
  };

  const paginationRange = getPaginationRange();

  return (
    <div
      {...rest}
      className={cn(
        "flex gap-2 flex-1 items-center justify-center",
        rest.className
      )}
    >
      {paginationRange.map((page, index) => (
        <Button
          key={index}
          className="disabled:bg-muted disabled:opacity-100"
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            if (typeof page === "number") {
              onValueChange(page - 1);
            }
          }}
          disabled={page === currentInd + 1}
        >
          {page}
        </Button>
      ))}
    </div>
  );
}

export default PageNums;
