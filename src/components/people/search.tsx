"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import useUrlQuery from "@/hooks/url-query";
import useTableState from "@/state/table";

function Search() {
  const { input, setInput } = useTableState((s) => ({
    input: s.searchVal,
    setInput: s.setSearchVal,
  }));
  const { query, setQueryParam } = useUrlQuery(true, 500);

  // run on first render
  useEffect(() => {
    setInput(query.get("search") || "");
  }, []);

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setQueryParam("search", e.target.value);
        }}
        className="max-w-sm"
      />
    </div>
  );
}

export default Search;
