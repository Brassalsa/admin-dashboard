import { User } from "@/types";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import Tag, { getVarientsFromArr } from "../ui/tag";
import { Roles, Teams } from "@/lib/constants/user";
import ActionsComp from "./column-comp/action-comp";
import { NameCell, NameHeader } from "./column-comp/name-comp";
import { StatusHeader, StatusRow } from "./column-comp/status-comp";

type People = User;
export type PeopleCellComp = {
  row: Row<User>;
};
export type PeopleHeaderComp = {
  column: Column<User, unknown>;
};

export const columns: ColumnDef<People>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <NameHeader column={column} />,
    cell: ({ row }) => <NameCell row={row} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <StatusHeader column={column} />,
    cell: ({ row }) => <StatusRow row={row} />,
  },
  {
    accessorKey: "role",
    filterFn: "arrIncludesSome",
    header: "Role",
    cell: ({ row }) => <>{Roles[row.original.role as keyof typeof Roles]}</>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "teams",
    filterFn: "arrIncludesSome",
    header: "Teams",
    cell: ({ row }) => {
      const varients = getVarientsFromArr();

      return row.original.teams.map((i) => (
        <Tag key={i} className="mr-1" varient={varients()}>
          {Teams[i as keyof typeof Teams]}
        </Tag>
      ));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsComp row={row} />,
  },
];
