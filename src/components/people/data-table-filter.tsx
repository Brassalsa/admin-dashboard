"use client";
import { ChevronDown, FilterIcon } from "lucide-react";
import React, { Ref, useEffect, useState } from "react";
import { Button } from "../ui/button";

import { Roles, Teams } from "@/lib/constants/user";

import MultiSelect, { MultiSelectRef } from "../ui/multi-select";
import useUrlQuery from "@/hooks/url-query";
import useTableState from "@/state/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Filter } from "@/types";

function DataTableFilter() {
  const [open, setOpen] = useState(false);
  const [accordin, setAccordin] = useState("");
  const trigger = () => setOpen((prev) => !prev);
  const query = useUrlQuery(true);
  const { table, filter, setFilter } = useTableState((s) => ({
    table: s.table,
    filter: s.filter,
    setFilter: s.setFilter,
  }));

  const [localFilter, setLocalFilter] = useState<Filter>({
    roles: filter.roles,
    teams: filter.teams,
  });
  const setFilterLocal = (filter: Partial<Filter>) => {
    setLocalFilter({ ...localFilter, ...filter });
  };

  const setGlobalFilters = (
    filters?: { roles: string[]; teams: string[] },
    setQueries = false
  ) => {
    let roles = [],
      teams = [];
    if (filters) {
      roles = filters.roles;
      teams = filters.teams;
      setFilter({ roles, teams });
    } else {
      roles = filter.roles;
      teams = filter.teams;
    }
    table?.getColumn("role")?.setFilterValue(roles);
    table?.getColumn("teams")?.setFilterValue(teams);

    if (setQueries) {
      query.setQueryParams([
        { key: "roles", value: roles },
        { key: "teams", value: teams },
      ]);
    }
  };

  useEffect(() => {
    // run on initial render to set filters
    const roles = query.getQueryParam("roles").split(",");
    const teams = query.getQueryParam("teams").split(",");
    setGlobalFilters({
      roles,
      teams,
    });
    setLocalFilter({
      roles,
      teams,
    });
  }, []);

  const handleSubmit = () => {
    const roles = localFilter.roles.filter(
      (i) => Roles[i as keyof typeof Roles]
    );
    const teams = localFilter.teams.filter(
      (i) => Teams[i as keyof typeof Teams]
    );
    trigger();
    setGlobalFilters({ roles, teams }, true);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="scale-90">
          <FilterIcon className="stroke-slate-500 dark:stroke-slate-300 size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 px-2">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span className="text-base">Filters</span>
          <ChevronDown className="rotate-180 size-4 shrink-0 opacity-70 translate-x-2" />
        </DropdownMenuLabel>
        <Separator />
        <Accordion
          type="single"
          collapsible
          value={accordin}
          onValueChange={(val) => setAccordin(val)}
        >
          <FilterItem
            title="Roles"
            object={Roles}
            value={localFilter.roles}
            isChecked={accordin === "Roles"}
            onValueChange={(val) =>
              setFilterLocal({
                roles: val,
              })
            }
          />
          <FilterItem
            title="Teams"
            object={Teams}
            value={localFilter.teams}
            isChecked={accordin === "Teams"}
            onValueChange={(val) =>
              setFilterLocal({
                teams: val,
              })
            }
          />
          <Button
            className="w-full bg-primary-color text-white hover:opacity-85 hover:bg-primary-color"
            onClick={handleSubmit}
          >
            Select
          </Button>
        </Accordion>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableFilter;

type Props = {
  title: string;
  value?: string[];
  object: {
    [x: string]: string;
  };
  isChecked?: boolean;
  onValueChange: (val: string[]) => void;
};
const FilterItem = React.forwardRef(
  (
    { value, title, object, isChecked, onValueChange }: Props,
    ref: Ref<MultiSelectRef | undefined>
  ) => {
    return (
      <AccordionItem value={title}>
        <AccordionTrigger className="gap-2 hover:no-underline">
          <Checkbox checked={isChecked} className="size-4 rounded-[2px]" />
          <span className="flex-1 text-start">{title}</span>
        </AccordionTrigger>
        <AccordionContent className="text-base font-light pl-6">
          <MultiSelect
            items={Object.keys(object)}
            defaultVal={value}
            ref={ref}
            itemText={(key) => object[key]}
            onValueChange={onValueChange}
          />
        </AccordionContent>
      </AccordionItem>
    );
  }
);
