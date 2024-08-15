"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Tag from "../ui/tag";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";
import AddMember from "./add-menber";
import PeopleList from "./people-list";
import { generateUser } from "@/lib/utils/user";
import { User } from "@/types";

type Props = {
  users?: User[];
};
function People({ users: initialUsers = [] }: Props) {
  const [users, setUsers] = useState(initialUsers);
  useEffect(() => {
    if (initialUsers.length === 0) setUsers([generateUser(), generateUser()]);
  }, []);
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <div className="flex flex-wrap items-center ">
            <div className="flex-1 flex gap-2">
              <h3 className="text-lg font-semibold">Team members</h3>{" "}
              <Tag varient="violet">100 users</Tag>
            </div>
            <div className="flex gap-2 items-center ">
              <Input placeholder="Search..." className="max-w-60" />
              <Button variant="ghost" size="icon" className="scale-90">
                <FilterIcon className="stroke-slate-500" />
              </Button>
              <AddMember />
            </div>
          </div>
        </CardHeader>
        <PeopleList users={users} />
      </CardContent>
    </Card>
  );
}

export default People;
