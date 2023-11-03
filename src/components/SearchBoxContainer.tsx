import * as React from "react";
import { SearchBar } from "./header";
import SearchBox from "./SearchBox";

const SearchBoxContainer: React.FunctionComponent<{}> = () => {
  return (
    <div className="search-box-container">
      <SearchBox />
    </div>
  );
};

export default SearchBoxContainer;
