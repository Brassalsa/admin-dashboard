import { Filter, User } from "@/types";
import type {
  ColumnFiltersState,
  OnChangeFn,
  Table,
  TableState,
} from "@tanstack/react-table";
import type { Dispatch } from "react";
import { create } from "zustand";

type State = {
  table: Table<any> | null;
  initialTableState: TableState | null;
  setTable: Dispatch<Table<any> | null>;
  searchVal: string;
  setSearchVal: Dispatch<string>;
  filter: Filter;
  setFilter: Dispatch<Filter>;
  columnFilter: ColumnFiltersState;
  setColumnFilter: OnChangeFn<ColumnFiltersState>;

  set: Dispatch<State>;
};

const useTableState = create<State>((set, get) => ({
  table: null,
  initialTableState: null,
  setTable: (table) => set({ ...get(), table }),
  searchVal: "",
  setSearchVal: (searchVal) => set({ searchVal }),
  filter: { roles: [], teams: [] },
  setFilter: (filter) => set({ filter }),
  columnFilter: [],
  setColumnFilter: (val) => {
    let columnFilter = get().columnFilter;
    if (val instanceof Function) {
      columnFilter = val(columnFilter);
    }
    set({ columnFilter });
  },
  set,
}));

export default useTableState;
