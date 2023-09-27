import * as React from "react";
import { SearchBar, BaseElement } from "./header";

const EmptyWidgetConnector: React.FunctionComponent<{
  currentSearch: SearchBar;
  setCurrentSearch: (e: SearchBar) => void;
  rightPos: number[];
}> = (p) => {
  function addOr(i: number) {
    const newSearch: SearchBar = [];
    newSearch.push(...p.currentSearch.slice(0, i - 1));
    newSearch.push(p.currentSearch[i].acceptOr(p.currentSearch[i + 1]));
    newSearch.push(...p.currentSearch.slice(i + 1));
    p.setCurrentSearch(newSearch);
  }

  const body = p.rightPos.map((c, i) => {
    return (
      <div
        className="widget-connector"
        style={{ left: c - 9 }}
        key={i}
        onClick={() => addOr(i)}
      ></div>
    );
  });
  return(<>{body}</>);
};

export default EmptyWidgetConnector;
