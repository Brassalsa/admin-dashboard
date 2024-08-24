"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import useUrlQuery from "@/hooks/url-query";
import useTableState from "@/state/table";
import { SearchIcon } from "lucide-react";

function Search() {
  const { input, setInput } = useTableState((s) => ({
    input: s.searchVal,
    setInput: s.setSearchVal,
  }));
  const { query, setQueryParam } = useUrlQuery(true, 1000);

  // run on first render
  useEffect(() => {
    setInput(query.get("search") || "");
  }, []);

  return (
    <div className="flex items-center relative border py-0 pr-2 rounded focus-within:border-primary-color">
      <Input
        placeholder="Search..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setQueryParam("search", e.target.value);
        }}
        className="max-w-sm border-0"
      />
      <SearchIcon className="stroke-primary-color size-4" />
    </div>
  );
}

export default Search;
