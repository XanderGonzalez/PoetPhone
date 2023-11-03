import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { SearchBar, BaseElement, GlobalState, ContentArray } from "./header";

const EmptyWidgetConnector: React.FunctionComponent<{
}> = () => {
  const g = useContext(GlobalContext);
  const addOr = (i: number) => {
    const newSearch: ContentArray = [];
    const s = g.search.get;
    newSearch.push(...s.slice(0, i));
    newSearch.push(s[i].accept(s[i + 1]));
    newSearch.push(...s.slice(i + 2));
    g.search.set(newSearch);
  };
  console.log(g.rightPos.get);
  const body = g.rightPos.get.map((c, i) => {
    return (
      <div
        className="widget-connector"
        style={{ left: c - 9 }}
        key={i}
        onClick={() => addOr(i)}
      ></div>
    );
  });
  return <>{body}</>;
};

export default EmptyWidgetConnector;
