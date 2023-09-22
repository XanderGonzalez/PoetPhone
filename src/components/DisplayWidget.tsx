import * as React from "react";
import { Color } from "./header";

const DisplayWidget: React.FunctionComponent<{
  content: String;
  color: Color;
  cursor: String;
  events: { onClick: () => void };
  key: number;
}> = (p) => {
  switch (p.content) {
    case " ":
      return <span className="display-widget-space"></span>;
    case "\n":
      return <br></br>;
    default:
      if (p.color === undefined) {
        return (
          <div
            className="display-widget"
            style={{ backgroundColor: "white", cursor: String(p.cursor) }}
            {...p.events}
          >
            {p.content}
          </div>
        );
      }
      return (
        <div
          className="display-widget"
          style={{
            backgroundImage:
              "linear-gradient(" + p.color.color1 + ", " + p.color.color2 + ")",
            cursor: String(p.cursor),
          }}
          {...p.events}
        >
          {p.content}
        </div>
      );
  }
};

export default DisplayWidget;
