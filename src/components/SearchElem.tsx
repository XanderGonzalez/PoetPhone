import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { SearchBar, SearchElement, ContentArray } from "./header";
import DisplayWidget from "./DisplayWidget";

const SearchElem: React.FunctionComponent<{
  content: SearchElement;
  currentSearch: SearchBar;
  setCurrentSearch: (e: SearchBar) => void;
  pKey: number;
  centers: number[];
  rightPos: number[];
}> = (p) => {
  const connectorNum = p.currentSearch.length - 1;
  const refArray = useRef<(HTMLSpanElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);
  const [rightPos, setRightPos] = useState<number[]>([]);

  useEffect(() => {
    const newCenters: number[] = [];
    const newRights: number[] = [];
    refArray.current.map((el) => {
      if (el !== null) {
        newCenters.push(el.offsetWidth / 2 + el.offsetLeft);
        newRights.push(el.offsetWidth + el.offsetLeft);
      }
    });
    setCenters(newCenters);
    setRightPos(newRights.slice(0, -1));
  }, [p.content]);

  if (p.content.getElementType() === "base") {
    return (
      <span className="search-element">
        <div className="search-widget-base">
          <DisplayWidget {...p.content.getContent()} cursor="grab" />
        </div>
      </span>
    );
  } else {
    const body = (p.content.getContent() as ContentArray).map(
      (searchElement, i) => {
        return (
          <span ref={(e) => (refArray.current[i] = e)}>
            <SearchElem
              content={searchElement}
              currentSearch={p.currentSearch}
              setCurrentSearch={p.setCurrentSearch}
              key={i}
              pKey={i}
              centers={centers}
              rightPos={rightPos}
            />
          </span>
        );
      }
    );

    //const connector = connectorNum > 0 ? <WidgetConnector {...p} /> : null;

    return <span className="search-element">{body}</span>;
  }
};

export default SearchElem;
