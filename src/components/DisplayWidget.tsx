import * as React from "react";
import { BaseElement, Color, ContentArray } from "./header";
import { GlobalContext } from "../App";
import { useContext } from "react";

const DisplayWidget: React.FunctionComponent<{
  content: String;
  color: Color;
  cursor: String;
  eventType: "display" | "search";
}> = (p) => {
  console.log('dp test');
  const g = useContext(GlobalContext);
  const BE = new BaseElement({ phoneme: p.content, color: p.color });
  let onClickE: any = null;
  const addToSearch = (c: BaseElement): ContentArray => {
    const currentSearch: ContentArray = [...g.search.get];
    currentSearch.push(c);
    return currentSearch;
  };

  if (p.eventType === "display") {
    onClickE = () => g.search.set(addToSearch(BE));
  } else {

  }

  switch (p.content) {
    case " ":
      return <span className="display-widget-space"></span>;
    case "\n":
      return <br></br>;
    default:
      if (p.color === undefined) {
        return (
          <div
            className="display-widget"
            style={{ backgroundColor: "white", cursor: String(p.cursor) }}
            onClick={onClickE}
          >
            {p.content}
          </div>
        );
      }
      return (
        <div
          className="display-widget"
          style={{
            backgroundImage:
              "linear-gradient(" + p.color.color1 + ", " + p.color.color2 + ")",
            cursor: String(p.cursor),
          }}
          onClick={onClickE}
        >
          {p.content}
        </div>
      );
  }
};

export default DisplayWidget;
