import React, {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button } from "./button";
import { CheckCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  title?: string;
  defaultVal?: string[];
};

export type MultiSelectRef = {
  selectedItems: string[];
};

function MultiSelect(
  { items, title, defaultVal = [] }: Props,
  ref?: Ref<MultiSelectRef | undefined | null>
) {
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultVal);
  useImperativeHandle(ref, () => ({ selectedItems }));
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newSelectedRoles = checked
      ? [...selectedItems, value]
      : selectedItems.filter((role) => role !== value);

    setSelectedItems(newSelectedRoles);
  };

  return (
    <div className="-my-3">
      <div className="flex gap-2 items-center text-muted-foreground">
        <div>{title || "Filter values"}</div>
        <div className="ml-auto flex gap-1">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => setSelectedItems(items)}
            className=" scale-[0.6] "
          >
            <CheckCheck
              className={cn({
                "stroke-blue-500": items.length === selectedItems.length,
              })}
            />
            <span className="sr-only">select all values</span>
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => setSelectedItems([])}
            className=" scale-[0.6]"
          >
            <X />
            <span className="sr-only">clear all values</span>
          </Button>
        </div>
      </div>
      <div className="flex gap-6 flex-wrap">
        {items.map((role) => (
          <div key={role}>
            <label className="flex gap-1 items-center cursor-pointer ">
              <input
                type="checkbox"
                className="accent-blue-500"
                value={role}
                checked={selectedItems.includes(role)}
                onChange={handleCheckboxChange}
              />
              {role}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default forwardRef(MultiSelect);
