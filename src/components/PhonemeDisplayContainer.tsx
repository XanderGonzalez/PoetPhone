import * as React from "react";
import { SearchBar, DisplayText, BaseElement } from "./header";
import PhonemeDisplay from "./PhonemeDisplay";

const PhonemeDisplayContainer: React.FunctionComponent<{
  displayText: DisplayText;
  addToSearch: (e: BaseElement) => void;
}> = (p) => {
  return (
    <div className="phoneme-display-container">
      <PhonemeDisplay {...p} />
    </div>
  );
};

export default PhonemeDisplayContainer;
