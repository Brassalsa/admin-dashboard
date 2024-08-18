import { FilterIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Roles, Teams } from "@/lib/constants/user";

import MultiSelect, { MultiSelectRef } from "../ui/multi-select";
import useUrlQuery from "@/hooks/url-query";
import usePeopleState from "@/state/people";

function DataTableFilter() {
  const [open, setOpen] = useState(false);
  const rolesRef = useRef<MultiSelectRef>();
  const teamsRef = useRef<MultiSelectRef>();
  const trigger = () => setOpen((prev) => !prev);
  const query = useUrlQuery(true);
  const { table, filter, setFilter } = usePeopleState((s) => ({
    table: s.table,
    filter: s.filter,
    setFilter: s.setFilter,
  }));

  const setFilters = (
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
    setFilters({
      roles,
      teams,
    });
  }, []);

  const handleSubmit = () => {
    const roles = (rolesRef.current?.selectedItems || []).filter(
      (i) => Roles[i as keyof typeof Roles]
    );
    const teams = (teamsRef.current?.selectedItems || []).filter(
      (i) => Teams[i as keyof typeof Teams]
    );
    console.log(teams);

    trigger();
    setFilters({ roles, teams }, true);
  };

  const handleClear = () => {
    trigger();
    setFilters(usePeopleState.getInitialState().filter, true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="scale-90">
          <FilterIcon className="stroke-slate-500 dark:stroke-slate-300 size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>
          <DialogHeader>Filter</DialogHeader>
          <DialogDescription>Filter based on Role and Teams</DialogDescription>
        </DialogTitle>
        <Accordion type="multiple">
          <AccordionItem value="role">
            <AccordionTrigger>Role</AccordionTrigger>
            <AccordionContent>
              <MultiSelect
                title="Filter by roles"
                items={Object.keys(Roles)}
                defaultVal={filter.roles}
                ref={rolesRef}
                itemText={(key) => Roles[key as keyof typeof Roles]}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="teams">
            <AccordionTrigger>Teams</AccordionTrigger>
            <AccordionContent>
              <MultiSelect
                title="Filter by teams"
                items={Object.keys(Teams)}
                defaultVal={filter.teams}
                ref={teamsRef}
                itemText={(key) => Teams[key as keyof typeof Teams]}
              />
            </AccordionContent>
          </AccordionItem>
          <div className="flex gap-2 justify-end mt-3">
            <Button variant={"outline"} onClick={handleClear}>
              Clear
            </Button>

            <Button onClick={handleSubmit} type="submit">
              Apply
            </Button>
          </div>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}

export default DataTableFilter;
