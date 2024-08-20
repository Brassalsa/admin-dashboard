import { User } from "@/types";
import type { Dispatch } from "react";
import { create } from "zustand";

type PeopleList = {
  peopleList: User[];
  setPeopleList: Dispatch<User[]>;
  deletePeopleFromList: Dispatch<string>;
  addPeopleToList: Dispatch<User>;
};
export const usePeopleListState = create<PeopleList>((set, get) => ({
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
}));

type OverView = {
  people: User | null;
  setPeople: Dispatch<User | null>;
  open: boolean;
  setOpen: Dispatch<boolean>;
};

export const useOverViewState = create<OverView>((set) => ({
  people: null,
  setPeople: (people) => set({ people }),
  open: false,
  setOpen: (isOpen) => set({ open: isOpen }),
}));

type People = {
  people: User | null;
  setPeople: Dispatch<User | null>;
};

export const usePeopleState = create<People>((set) => ({
  people: null,
  setPeople: (people) => set({ people }),
}));
