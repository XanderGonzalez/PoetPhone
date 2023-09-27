import * as React from "react";
import { SearchBar, DisplayText, BaseElement } from "./header";
import WidgetBox from "./WidgetBox";

const PhonemeDisplay: React.FunctionComponent<{
  displayText: DisplayText;
  addToSearch: (e: BaseElement) => void;
}> = (p) => {
  return (
    <div className="phoneme-display">
      <WidgetBox {...p} />
    </div>
  );
};

export default PhonemeDisplay;
