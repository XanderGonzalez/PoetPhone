import * as React from "react";
import { GlobalContext } from "../App";
import { useState, useRef, useEffect, useContext } from "react";
import { SearchBar } from "./header";
import SearchElem from "./SearchElem";
import { useDrag } from "react-dnd";
import EmptyWidgetConnector from "./EmptyWidgetConnector";

const SearchBarElem: React.FunctionComponent<{}> = () => {
  const g = useContext(GlobalContext);
  const SBarRefArray = useRef<(HTMLSpanElement | null)[]>([]);
  const SElemRefArray = useRef<(HTMLSpanElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);
  //const [rightPos, setRightPos] = useState<number[]>([]);
  let baseCount: number[] = [];

  useEffect(() => {
    //count number of bases
    baseCount = [0];
    let ind = 0;
    g.search.get.map((c) => {
      ind += c.getBaseCount();
      baseCount.push(ind);
    });
    baseCount.push(ind);
    const newCenters: number[] = [];
    const newRights: number[] = [];
    SBarRefArray.current.map((el) => {
      if (el !== null) {
        newCenters.push(el.offsetWidth / 2 + el.offsetLeft);
      }
    });
    SElemRefArray.current.map((el) => {
      if (el !== null) {
        newRights.push(el.offsetWidth + el.offsetLeft);
      }
    });
    setCenters(newCenters);
    g.rightPos.set(newRights.slice(0, -1));
    console.log("Search");
    console.log(g.search.get);
    console.log(SBarRefArray);
    console.log(SElemRefArray);
  }, [g.search.get]);

  const body = g.search.get.map((searchElement, i) => {
    //let r = React.createRef<(HTMLSpanElement | null)[]>;
    //r. = SElemRefArray.current.slice(baseCount[i], baseCount[i + 1]);
    //SElemRefArray.current.push(...er.current);
    return (
      <span ref={(e) => (SBarRefArray.current[i] = e)} key={i}>
        <SearchElem
          content={searchElement}
          key={i}
          pKey={i}
          centers={centers}
          noConnector={false}
          start={baseCount[i]}
          end={baseCount[i+1]}
          //ref={(e) => SElemRefArray.current.push(...e)}
          ref={SElemRefArray}
          //.map((e) => {return e})}
        />
      </span>
    );
  });

  const connector = g.search.get.length > 1 ? <EmptyWidgetConnector /> : null;

  return (
    <div className="search-bar">
      {body}
      {connector}
    </div>
  );
};

export default SearchBarElem;
