import * as React from "react";
import { SearchBar, DisplayText, BaseElement } from "./header";
import WidgetBox from "./WidgetBox";

const PhonemeDisplay: React.FunctionComponent<{}> = () => {
  return (
    <div className="phoneme-display">
      <WidgetBox />
    </div>
  );
};

export default PhonemeDisplay;
