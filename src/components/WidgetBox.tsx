import * as React from "react";
import { SearchBar, DisplayText, BaseElement } from "./header";
import DisplayWidget from "./DisplayWidget";

const WidgetBox: React.FunctionComponent<{
  displayText: DisplayText;
  currentSearch: SearchBar;
  updateSearch: (e: SearchBar) => void;
}> = (p) => {
  function newSearch(c: BaseElement) {
    const newSearch: SearchBar = p.currentSearch;
    newSearch.push(c);
    return newSearch;
  }

  const body = p.displayText.map((c, i) => {
    const events = { onClick: () => p.updateSearch(newSearch(c)) };
    return (
      <DisplayWidget
        content={c.getContent().phoneme}
        color={c.getContent().color}
        cursor="pointer"
        events={events}
        key={i}
      />
    );
  });

  return <div className="widget-box">{body}</div>;
};

export default WidgetBox;
