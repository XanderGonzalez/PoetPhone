import * as React from "react";
import { SearchBar } from "./header";
import SearchBox from "./SearchBox";

const SearchBoxContainer: React.FunctionComponent<{
  currentSearch: SearchBar;
  setCurrentSearch: (e: SearchBar) => void;
}> = (p) => {
  return (
    <div className="search-box-container">
      <SearchBox {...p} />
    </div>
  );
};

export default SearchBoxContainer;