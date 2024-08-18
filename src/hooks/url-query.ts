"use client";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useDebounce from "./debounce";

const useUrlQuery = (withDebounce = false, delay = 200) => {
  const params = useSearchParams();
  const debounce = useDebounce(delay);

  const pusher = (newQuery: URLSearchParams) => {
    const newUrl = `${window.location.pathname}?${newQuery.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const getQueryParam = useCallback(
    (key: string) => decodeURIComponent(params.get(key) || ""),
    []
  );
  const setQueryParam = useCallback(<T>(key: string, value: T) => {
    const newQuery = new URLSearchParams(params);
    newQuery.delete(key);
    newQuery.append(key, encodeURIComponent(String(value)));
    pusher(newQuery);
  }, []);

  const setQueryParams = useCallback(
    <T>(paramsList: { key: string; value: T }[]) => {
      const newQuery = new URLSearchParams(params);
      paramsList.map(({ key, value }) => {
        newQuery.delete(key);
        newQuery.append(key, encodeURIComponent(String(value)));
      });
      pusher(newQuery);
    },
    []
  );

  const debounceQuery = useCallback(
    <T>(key: string, value: T) => {
      debounce(() => setQueryParam(key, value));
    },
    [withDebounce, delay]
  );
  const debounceQueries = useCallback(
    <T>(params: { key: string; value: T }[]) => {
      debounce(() => setQueryParams(params));
    },
    [withDebounce, delay]
  );

  const deleteQueryParam = useCallback((key: string) => {
    const newQuery = new URLSearchParams(params);
    newQuery.delete(key);
    pusher(newQuery);
  }, []);

  const deleteQueryParams = useCallback((keys: string[]) => {
    const newQuery = new URLSearchParams(params);
    keys.forEach((key) => newQuery.delete(key));
    pusher(newQuery);
  }, []);

  return {
    query: params,
    getQueryParam,
    setQueryParam: withDebounce ? debounceQuery : setQueryParam,
    setQueryParams: withDebounce ? debounceQueries : setQueryParams,
    deleteQueryParam,
    deleteQueryParams,
  };
};

export default useUrlQuery;
