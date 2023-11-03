import React, { useContext } from "react";
import { GlobalContext } from "../App";

const TextField: React.FunctionComponent<{}> = () => {
  const g = useContext(GlobalContext);
  return (
    <div className="text-field-container">
      <div className="text-field-box">
        <textarea
          autoFocus
          className="text-field"
          wrap="off"
          onChange={(e) => g.user.set(e.target.value)}
          placeholder="click here to enter text"
        ></textarea>
      </div>
    </div>
  );
};

export default TextField;
