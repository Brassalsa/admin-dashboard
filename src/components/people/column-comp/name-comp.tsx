import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { PeopleCellComp, PeopleHeaderComp } from "../columns";
import UserUI, {
  UserUIImg,
  UserUiName,
  UserUIUserName,
} from "@/components/user-ui";

export const NameHeader = ({ column }: PeopleHeaderComp) => {
  const asc = column.getIsSorted() === "asc";
  const desc = column.getIsSorted() === "desc";
  return (
    <button
      className="flex items-center"
      onClick={() => column.toggleSorting(asc, true)}
    >
      Name
      {asc ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : desc ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </button>
  );
};

export const NameCell = ({ row }: PeopleCellComp) => {
  const user = row.original;

  return (
    <UserUI {...user}>
      <UserUIImg className="shrink-0" />
      <div className="flex flex-col gap-0">
        <UserUiName className="text-sm" />
        <UserUIUserName className="text-muted-foreground text-xs" />
      </div>
    </UserUI>
  );
};
