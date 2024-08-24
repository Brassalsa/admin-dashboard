import { cn } from "@/lib/utils";
import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Dispatch,
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Checkbox } from "./checkbox";

type Props = ComponentPropsWithoutRef<"div"> & {
  items: string[];
  defaultVal?: string[];
  onValueChange?: (val: string[]) => void;
  itemText?: (val: string) => string;
};

export type MultiSelectRef = {
  selectedItems: string[];
  setSelectedItems: Dispatch<string[]>;
};

function MultiSelect(
  { items, defaultVal = [], onValueChange, itemText, ...rest }: Props,
  ref?: Ref<MultiSelectRef | undefined | null>
) {
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultVal);

  useImperativeHandle(ref, () => ({ selectedItems, setSelectedItems }));

  useEffect(() => {
    onValueChange?.(selectedItems);
  }, [selectedItems]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newSelectedRoles = checked
      ? [...selectedItems, value]
      : selectedItems.filter((role) => role !== value);

    setSelectedItems(newSelectedRoles);
  };

  return (
    <div {...rest} className={cn("gap-y-2", rest.className)}>
      {items.map((key) => (
        <div key={key} className="shrink-0">
          <label className="flex gap-1 items-center cursor-pointer">
            <input
              type="checkbox"
              className="accent-primary-color hidden"
              value={key}
              checked={selectedItems.includes(key)}
              onChange={handleCheckboxChange}
            />
            <Checkbox value={key} checked={selectedItems.includes(key)} />
            {itemText ? itemText(key) : key}
          </label>
        </div>
      ))}
    </div>
  );
}

export default forwardRef(MultiSelect);
