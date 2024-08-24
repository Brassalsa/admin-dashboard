import { Checkbox } from "@/components/ui/checkbox";
import { useOverViewState } from "@/state/people";
import { User } from "@/types";
import { Row, Table } from "@tanstack/react-table";

type HeaderProps = {
  table: Table<User>;
};
export const SelectHeader = ({ table }: HeaderProps) => {
  return (
    <Checkbox
      checked={
        table!.getIsAllPageRowsSelected() ||
        (table!.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table!.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
};

export const SelectCell = ({ row }: { row: Row<User> }) => {
  const overview = useOverViewState((s) => s.open);
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      onClick={(e) => {
        overview && e.stopPropagation();
      }}
    />
  );
};
