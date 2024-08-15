import { User } from "@/types";
import React from "react";
import { Table, TableBody, TableHead, TableHeader } from "../ui/table";
import PeopleItem from "./people-item";
import { Separator } from "../ui/separator";

type Props = {
  users: User[];
};

function PeopleList({ users }: Props) {
  return (
    <Table>
      <TableHeader className="border-b">
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Teams</TableHead>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <PeopleItem key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
}

export default PeopleList;
