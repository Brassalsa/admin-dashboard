"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import useUrlQuery from "@/hooks/url-query";
import useTableState from "@/state/table";
import { Loader, LucideIcon, SearchIcon } from "lucide-react";
import useDebounce from "@/hooks/debounce";
import { PropsWIthClassName } from "@/types";
import { cn } from "@/lib/utils";

function Search() {
  const [loading, setLoading] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const setSearch = useTableState((s) => s.setSearchVal);
  const { query, setQueryParam } = useUrlQuery();
  const debounce = useDebounce(500);

  // run on first render
  useEffect(() => {
    const val = query.get("search") || "";
    setSearch(val);
    setLocalSearch(val);
  }, []);

  return (
    <div className="flex items-center relative border py-0 pr-2 rounded focus-within:border-primary-color">
      <Input
        placeholder="Search..."
        value={localSearch}
        onChange={(e) => {
          const val = e.target.value;
          setLocalSearch(val);
          setLoading(true);
          debounce(() => {
            setQueryParam("search", val);
            setSearch(val);
            setLoading(false);
          });
        }}
        className="max-w-sm border-0"
      />
      {loading ? (
        <Icon Icon={Loader} className="animate-spin" />
      ) : (
        <Icon Icon={SearchIcon} />
      )}
    </div>
  );
}

export default Search;

function Icon({ Icon, className }: PropsWIthClassName & { Icon: LucideIcon }) {
  return <Icon className={cn("stroke-primary-color size-4", className)} />;
}
