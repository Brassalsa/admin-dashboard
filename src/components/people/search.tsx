"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import userUrlQuery from "@/hooks/url-query";
import useDebounce from "@/hooks/debounce";
import usePeopleState from "@/state/people";

function Search() {
  const { input, setInput } = usePeopleState((s) => ({
    input: s.searchVal,
    setInput: s.setSearchVal,
  }));
  const { query, setQueryParam } = userUrlQuery();
  const debounce = useDebounce();

  // run on first render
  useEffect(() => {
    setInput(query.get("search") || "");
  }, []);

  // run on change and debounce
  useEffect(() => {
    debounce(() => {
      setQueryParam("search", input);
    });
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
