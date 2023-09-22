import * as React from "react";
import { SearchBar, DisplayText } from "./header";
import WidgetBox from "./WidgetBox";

const PhonemeDisplay: React.FunctionComponent<{
  displayText: DisplayText;
  currentSearch: SearchBar;
  updateSearch: (e: SearchBar) => void;
}> = (p) => {
  return (
    <div className="phoneme-display">
      <WidgetBox {...p} />
    </div>
  );
};

export default PhonemeDisplay;
