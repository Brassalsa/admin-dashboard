"use client";
import { Card, CardContent } from "../ui/card";

import { User } from "@/types";
import DataTable from "./data-table";
import { columns } from "./columns";
import { useOverViewState, usePeopleListState } from "@/state/people";
import { useEffect } from "react";

type Props = {
  users: User[];
};
function People({ users: initialUser }: Props) {
  const { peopleList, setPeopleList } = usePeopleListState((s) => ({
    peopleList: s.peopleList,
    setPeopleList: s.setPeopleList,
  }));
  useEffect(() => {
    setPeopleList(initialUser);
  }, []);
  return (
    <>
      <Card className="flex-1 overflow-x-hidden border-none">
        <CardContent className="border-none">
          <DataTable
            columns={columns}
            data={peopleList}
            onRowClick={(data) => {
              const state = useOverViewState.getState();
              useOverViewState.setState({
                open: state.open ? state.people?.id != data.id : true,
                people: data,
              });
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default People;
