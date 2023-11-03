import * as React from "react";
import {
  AndOrElementInterface,
  ContentArray,
  SearchBar,
  SearchElement,
} from "./header";
import { GlobalContext } from "../App";
import { useContext, useEffect, useState } from "react";

interface propType {
  content: AndOrElementInterface;
  rightPos: number[];
  pKey: number;
}

const WidgetConnector: React.FunctionComponent<{
  content: AndOrElementInterface;
  pKey: number;
}> = (p) => {
  interface retType {
    rightPos: number;
    key: number;
    connectType: "or" | "and";
  }
  const retArray: Array<retType> = [];
  const g = useContext(GlobalContext);
  let rightPos: number[] = [];
  //useEffect(() => {
  //  rightPos = g.rightPos.get[p.pKey];
  //  console.log(p.pKey);
  //  console.log(rightPos);
  //  console.log(g.rightPos.get);
  //}, [p.content]);
  const andConnection = (i: number) => {
    const s = g.search.get;
    const newSearch: ContentArray = [];
    newSearch.push(...s.slice(0, p.pKey));
    newSearch.push(p.content.addAndConnection(i));
    newSearch.push(...s.slice(p.pKey + 1));
    g.search.set(newSearch);
  };
  if (p.content.getElementType() === "or") {
    rightPos.map((c, i) => {
      retArray.push({ rightPos: c, key: i, connectType: "or" });
    });
  } else {
    console.log("and test");
    console.log(p.content);
    let baseLength = 0;
    let typeArray = new Array<"and" | "or">();
    p.content.getContent().map((c) => {
      if (baseLength !== 0) {
        typeArray.push("and");
      }
      if (c.getElementType() === "or") {
        const i = c.getContent().length as number;
        baseLength += i;
        typeArray.push(...Array(i - 1).fill("or"));
      } else {
        baseLength++;
      }
    });
    for (let j = 0; j < baseLength - 1; j++) {
      retArray.push({
        rightPos: rightPos[j],
        key: j,
        connectType: typeArray[j],
      });
    }
    console.log(baseLength);
  }
  console.log(retArray);
  const body = retArray.map((r) => {
    if (r.connectType === "or") {
      return (
        <div
          className="widget-connector"
          style={{ left: r.rightPos - 9 }}
          key={r.key}
          onClick={() => andConnection(r.key)}
        >
          <span className="or-connector" key={r.key}></span>
        </div>
      );
    } else {
      return (
        <div
          className="widget-connector"
          style={{ left: r.rightPos - 9 }}
          key={r.key}
          onClick={() => andConnection(r.key)}
        >
          <div className="and-connector-1" key={r.key}></div>
          <div className="and-connector-2" key={r.key + 1}></div>
        </div>
      );
    }
  });
  return <>{body}</>;
};

export default WidgetConnector;
