import * as React from "react";
import { SearchBar, DisplayText, BaseElement } from "./header";
import PhonemeDisplay from "./PhonemeDisplay";

const PhonemeDisplayContainer: React.FunctionComponent<{}> = () => {
  return (
    <div className="phoneme-display-container">
      <PhonemeDisplay />
    </div>
  );
};

export default PhonemeDisplayContainer;
