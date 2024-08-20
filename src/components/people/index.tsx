"use client";
import { Card, CardContent, CardHeader } from "../ui/card";
import Tag from "../ui/tag";

import AddMember from "./add-menber";
import { User } from "@/types";
import PeopleSheet from "./people-sheet";
import DataTable from "./data-table";
import { columns } from "./columns";
import Search from "./search";
import { useOverViewState, usePeopleListState } from "@/state/people";
import { useEffect } from "react";
import DataTableFilter from "./data-table-filter";

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
      <Card className="flex-1">
        <CardContent>
          <CardHeader>
            <div className="flex flex-wrap items-center">
              <div className="flex-1 flex gap-2 shrink-0 min-w-fit justify-center md:justify-start">
                <h3 className="text-lg font-semibold">Team members</h3>{" "}
                <Tag varient="violet">{peopleList?.length}</Tag>
              </div>
              <div className="ml-auto flex flex-wrap gap-2 items-center justify-center ">
                <Search />
                <DataTableFilter />
                <AddMember />
              </div>
            </div>
          </CardHeader>
          <DataTable
            columns={columns}
            data={peopleList}
            onRowClick={(data) => {
              useOverViewState.setState({
                open: true,
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
