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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tag from "./tag";
import { ChevronDown, X } from "lucide-react";
import { Button } from "./button";
import { fa } from "@faker-js/faker";

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

export const MultiSelectDropdown = forwardRef(
  (
    { items, title, itemText, onValueChange }: Props,
    ref: Ref<MultiSelectRef | undefined | null>
  ) => {
    const [open, setOpen] = useState(false);
    const [localValues, setlocalValues] = useState(items);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    // expose selected values
    useImperativeHandle(ref, () => ({ selectedItems, setSelectedItems }));

    useEffect(() => {
      onValueChange?.(selectedItems);
    }, [selectedItems]);

    const addSelected = (val: string) => {
      setSelectedItems([...selectedItems, val]);
      setlocalValues([...localValues.filter((i) => i != val)]);
    };

    const removeSelected = (val: string) => {
      setSelectedItems([...selectedItems.filter((i) => i != val)]);
      setlocalValues([...localValues, val]);
    };

    return (
      <div className="relative isolate">
        <Select onValueChange={addSelected} open={open} onOpenChange={setOpen}>
          <div
            className="flex gap-2 bg-background min-h-8 border w-full rounded z-10 items-center pl-2 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div
              className="flex gap-2 flex-wrap"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItems.map((i) => (
                <Tag className="flex gap-1 items-center h-fit rounded-sm">
                  <span className="text-primary-color">
                    {itemText ? itemText(i) : i}
                  </span>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="p-0 size-4 "
                    type="button"
                    onClick={() => {
                      removeSelected(i);
                    }}
                  >
                    <X />
                  </Button>
                </Tag>
              ))}
            </div>
            <div className="ml-auto flex" onClick={(e) => e.stopPropagation()}>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="p-0 "
                type="button"
                onClick={() => {
                  setSelectedItems([]);
                  setlocalValues(items);
                }}
              >
                <X className="opacity-50" />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="p-0"
                type="button"
                onClick={() => setOpen(true)}
              >
                <ChevronDown className="opacity-50" />
              </Button>
            </div>
          </div>
          <SelectTrigger className="pointer-events-none -mt-10 opacity-0" />
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{title}</SelectLabel>
              {localValues.map((i) => (
                <SelectItem value={i}>{itemText ? itemText(i) : i}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
);
