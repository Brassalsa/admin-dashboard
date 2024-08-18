"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import useUrlQuery from "@/hooks/url-query";
import useDebounce from "@/hooks/debounce";
import usePeopleState from "@/state/people";

function Search() {
  const { input, setInput } = usePeopleState((s) => ({
    input: s.searchVal,
    setInput: s.setSearchVal,
  }));
  const { query, setQueryParam } = useUrlQuery();
  const debounce = useDebounce();

  // run on first render
  useEffect(() => {
    setInput(query.get("search") || "");
  }, []);

  // run on change and debounce
  useEffect(() => {
    debounce(() => {
      setQueryParam("search", input);
    }, 1000);
  }, [input]);

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}

export default Search;
