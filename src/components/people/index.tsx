"use client";
import { Card, CardContent, CardHeader } from "../ui/card";
import Tag from "../ui/tag";
import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";
import AddMember from "./add-menber";
import { User } from "@/types";
import PeopleSheet from "./people-sheet";
import DataTable from "./data-table";
import { columns } from "./columns";
import Search from "./search";
import usePeopleState from "@/state/people";
import { useEffect } from "react";
import DataTableFilter from "./data-table-filter";

type Props = {
  users: User[];
};
function People({ users: initialUser }: Props) {
  const { peopleList, setPeopleList } = usePeopleState((s) => ({
    peopleList: s.peopleList,
    setPeopleList: s.setPeopleList,
  }));
  useEffect(() => {
    setPeopleList(initialUser);
  }, []);
  return (
    <>
      <PeopleSheet />
      <Card>
        <CardContent>
          <CardHeader>
            <div className="flex flex-wrap items-center ">
              <div className="flex-1 flex gap-2">
                <h3 className="text-lg font-semibold">Team members</h3>{" "}
                <Tag varient="violet">{peopleList?.length}</Tag>
              </div>
              <div className="flex gap-2 items-center ">
                <Search />
                <DataTableFilter />
                <AddMember />
              </div>
            </div>
          </CardHeader>
          <DataTable columns={columns} data={peopleList} />
        </CardContent>
      </Card>
    </>
  );
}

export default People;
