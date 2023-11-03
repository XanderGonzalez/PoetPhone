import * as React from "react";
import { SearchBar } from "./header";
import SearchBarElem from "./SearchBarElem";
import SearchDisplay from "./SearchDisplay";

const SearchBox: React.FunctionComponent<{}> = () => {
  return (
    <div className="search-box">
      <SearchBarElem />
      <br />
      <SearchDisplay />
    </div>
  );
};

export default SearchBox;
