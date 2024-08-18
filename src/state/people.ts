import { Filter, User } from "@/types";
import type { Table, TableState } from "@tanstack/react-table";
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

  peopleList: User[];
  setPeopleList: Dispatch<User[]>;
  deletePeopleFromList: Dispatch<string>;
  addPeopleToList: Dispatch<User>;

  people: User | null;
  setPeople: Dispatch<User | null>;

  overView: boolean;
  setOverView: Dispatch<boolean>;

  edit: boolean;
  setEdit: Dispatch<boolean>;

  set: Dispatch<State>;
};

const usePeopleState = create<State>((set, get) => ({
  table: null,
  initialTableState: null,
  setTable: (table) => set({ ...get(), table }),
  searchVal: "",
  setSearchVal: (searchVal) => set({ searchVal }),
  filter: { roles: [], teams: [] },
  setFilter: (filter) => set({ filter }),

  peopleList: [],
  setPeopleList: (peopleList) => set({ peopleList }),
  deletePeopleFromList: (id: string) =>
    set({
      peopleList: get().peopleList.filter((i) => i.id !== id),
    }),
  addPeopleToList: (update) => {
    let edit = false;
    const newPeopleList = get().peopleList.map((people) => {
      if (people.id === update.id) {
        edit = true;
        return update;
      }
      return people;
    });
    if (!edit) {
      newPeopleList.unshift(update);
    }
    set({ peopleList: newPeopleList });
  },
  people: null,
  setPeople: (people) => set({ people }),

  overView: false,
  setOverView: (overView) => set({ overView }),

  edit: false,
  setEdit: (edit) => set({ edit }),
  set,
}));

export default usePeopleState;
