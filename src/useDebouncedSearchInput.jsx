import React, { useEffect, useState } from "react";

const useDebouncedInput = (searchInput, delay) => {
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, delay);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  return debouncedSearchInput;
  return <>useDebouncedInput</>;
};

export default useDebouncedInput;
