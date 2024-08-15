import React from "react";
import { TableCell, TableRow } from "../ui/table";
import UserUI, { UserUIImg, UserUiName, UserUIUserName } from "../user-ui";
import { User } from "@/types";
import { Status } from "@/lib/constants/user";
import Tag from "../ui/tag";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  user: User;
};
function PeopleItem({ user }: Props) {
  const { status } = user;
  const isActive = status === Status.Active;
  return (
    <TableRow className="border-b">
      <TableCell>
        <UserUI email={user.email} name={user.name} img={user.image}>
          <UserUIImg className="shrink-0" />
          <div className="flex flex-col gap-0">
            <UserUiName className="text-sm" />
            <UserUIUserName className="text-muted-foreground text-xs" />
          </div>
        </UserUI>
      </TableCell>
      <TableCell>
        <Tag className="flex gap-0 items-center p-0">
          <Dot
            className={cn(
              "size-fit -translate-x-1",
              isActive ? "text-green-500" : "text-red-500"
            )}
          />
          <span className="-translate-x-2">{status}</span>
        </Tag>
      </TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        {user.teams.map((i) => (
          <Tag key={i} className="mr-1">
            {i}
          </Tag>
        ))}
      </TableCell>
    </TableRow>
  );
}

export default PeopleItem;
