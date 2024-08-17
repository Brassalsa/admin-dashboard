import { FilterIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import userUrlQuery from "@/hooks/url-query";
import usePeopleState from "@/state/people";

function DataTableFilter() {
  const [open, setOpen] = useState(false);
  const rolesRef = useRef<MultiSelectRef>();
  const teamsRef = useRef<MultiSelectRef>();
  const trigger = () => setOpen((prev) => !prev);
  const query = userUrlQuery(true);
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
    const roles = query.getQueryParam("roles").split(",");
    const teams = query.getQueryParam("teams").split(",");
    setFilter({
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

    alert("bruh");
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
        <Button variant="ghost" size="icon" className="scale-90">
          <FilterIcon className="stroke-slate-500" />
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
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="teams">
            <AccordionTrigger>Teams</AccordionTrigger>
            <AccordionContent>
              <MultiSelect
                title="Filter by teams"
                items={Object.keys(Teams)}
                defaultVal={filter.roles}
                ref={teamsRef}
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
