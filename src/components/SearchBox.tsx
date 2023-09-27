import * as React from "react";
import { SearchBar } from "./header";
import SearchBarElem from "./SearchBarElem";
import SearchDisplay from "./SearchDisplay";

const SearchBox: React.FunctionComponent<{
  currentSearch: SearchBar;
  setCurrentSearch: (e: SearchBar) => void;
}> = (p) => {
  return (
    <div className="search-box">
      <SearchBarElem {...p} />
      <br />
      <SearchDisplay />
    </div>
  );
};

export default SearchBox;
