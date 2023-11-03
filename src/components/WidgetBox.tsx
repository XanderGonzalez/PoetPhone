import React, { useContext } from "react";
import { GlobalContext } from "../App";
import DisplayWidget from "./DisplayWidget";

const WidgetBox: React.FunctionComponent<{}> = () => {
  const g = useContext(GlobalContext);
  const body = g.display.get.map((c, i) => {
    return (
      <DisplayWidget
        content={c.getContent().phoneme}
        color={c.getContent().color}
        cursor="pointer"
        eventType="display"
        key={i}
      />
    );
  });
  return <div className="widget-box">{body}</div>;
};

export default WidgetBox;
