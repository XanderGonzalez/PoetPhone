import React, { MouseEventHandler, useContext } from "react";
import { GlobalContext } from "../App";
import { BaseContent, BaseElement, DisplayText } from "./header";

const SearchDisplay: React.FunctionComponent<{}> = (p) => {
  const test1: BaseContent = { phoneme: "a", color: undefined };
  const test2: BaseContent = { phoneme: "b", color: undefined };
  const test3: DisplayText = [new BaseElement(test1), new BaseElement(test2)];

  const g = useContext(GlobalContext);
  return (
    <div className="text-button-container">
      <button className="text-button" onClick={() => g.display.set(test3)}>
        Convert to IPA
      </button>
    </div>
  );
};

export default SearchDisplay;
