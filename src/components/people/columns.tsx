import { User } from "@/types";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import Tag, { getVarientsFromArr } from "../ui/tag";
import { Roles, Teams } from "@/lib/constants/user";
import ActionsComp from "./column-comp/action-comp";
import { NameCell, NameHeader } from "./column-comp/name-comp";
import { StatusHeader, StatusRow } from "./column-comp/status-comp";
import { Checkbox } from "../ui/checkbox";

type People = User;
export type PeopleCellComp = {
  row: Row<User>;
};
export type PeopleHeaderComp = {
  column: Column<User, unknown>;
};

export const columns: ColumnDef<People>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
