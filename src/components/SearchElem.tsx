import * as React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import {
  SearchBar,
  SearchElement,
  ContentArray,
  BaseContent,
  AndOrElementInterface,
} from "./header";
import DisplayWidget from "./DisplayWidget";
import WidgetConnector from "./WidgetConnector";
import { GlobalContext } from "../App";

type IInputProps = {
  content: SearchElement;
  pKey: number;
  centers: number[];
  noConnector: boolean;
  start: number;
  end: number;
};

const SearchElem = React.forwardRef<(HTMLSpanElement | null)[], IInputProps>(
  (p, ref) => {
    const refArray = useRef<(HTMLSpanElement | null)[]>([]);
    const [centers, setCenters] = useState<number[]>([]);
    //const [rightPos, setRightPos] = useState<number[]>([]);
    //const myRef = useRef<HTMLSpanElement | null>(null);
    const g = useContext(GlobalContext);
    let body = null;
    let connector = null;
    let j = 0;
    useEffect(() => {
      let k = 0;
      for (let i = p.start; i < p.end; i++) {
        if (typeof ref === "object" && ref && ref.current) {
          ref.current[i] = refArray.current[k];
          k++;
        }
      }
    }, [p.content]);
    const returnBase = (bc: BaseContent, i: number) => {
      return (
        <span
          ref={(e) => {
            refArray.current[i] = e;
          }}
          key={i}
        >
          <span className="search-element">
            <div className="search-widget-base">
              <DisplayWidget
                content={bc.phoneme}
                color={bc.color}
                cursor="grab"
                eventType="search"
              />
            </div>
          </span>
        </span>
      );
    };

    //useEffect(() => {
    //  const newCenters: number[] = [];
    //  const newRights: number[] = [];
    //  refArray.current.map((el) => {
    //    if (el !== null) {
    //      newCenters.push(el.offsetWidth / 2 + el.offsetLeft);
    //      newRights.push(el.offsetWidth + el.offsetLeft);
    //    }
    //  });
    //  setCenters(newCenters);
    //  console.log(g.rightPos.get);
    //  g.rightPos.set(g.rightPos.get.splice(p.pKey, 1, newRights.slice(0, -1)));
    //  console.log(g.rightPos.get);
    //}, [p.content]);
    if (p.content.getElementType() === "base") {
      const bc = p.content.getContent() as BaseContent;
      return returnBase(bc, j);
    } else {
      const ca = (p.content as AndOrElementInterface).getContent();
      const retArray = new Array<JSX.Element>();
      ca.map((searchElement) => {
        if (searchElement.getElementType() === "or") {
          (searchElement as AndOrElementInterface).getContent().map((bc) => {
            retArray.push(returnBase(bc.getContent() as BaseContent, j));
            j++;
          });
        } else {
          retArray.push(
            returnBase(searchElement.getContent() as BaseContent, j)
          );
          j++;
        }
      });
      body = <>{retArray}</>;
      if (ca.length > 1) {
        console.log(p.content);
        connector = (
          <WidgetConnector
            content={p.content as AndOrElementInterface}
            pKey={p.pKey}
          />
        );
      }
    }

    return (
      <span className="search-element">
        {body}
        {connector}
      </span>
    );
  }
);

export default SearchElem;
