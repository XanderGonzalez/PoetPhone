import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { SearchBar } from "./header";
import SearchElem from "./SearchElem";
import { useDrag } from 'react-dnd'
import EmptyWidgetConnector from "./EmptyWidgetConnector";

const SearchBarElem: React.FunctionComponent<{
  currentSearch: SearchBar;
  setCurrentSearch: (e: SearchBar) => void;
}> = (p) => {
  const connectorNum = p.currentSearch.length - 1;
  const refArray = useRef<(HTMLSpanElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);
  const [rightPos, setRightPos] = useState<number[]>([]);

  useEffect(() => {
    console.log('search bar test');
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
  }, [p.currentSearch]);

  const body = p.currentSearch.map((searchElement, i) => {
    return (
      <span ref={(e) => (refArray.current[i] = e)} key={i}>
        <SearchElem
          content={searchElement}
          {...p}
          key={i}
          pKey={i}
          centers={centers}
          rightPos={rightPos}
        />
      </span>
    );
  });

  const connector =
    connectorNum > 0 ? (
      <EmptyWidgetConnector rightPos={rightPos} {...p} />
    ) : null;

  return (
    <div className="search-bar">
      {body}
      {connector}
    </div>
  );
};

export default SearchBarElem;
