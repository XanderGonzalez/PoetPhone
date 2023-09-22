import * as React from "react";

const TextField: React.FunctionComponent<{
  setUserText: (e: string) => void;
}> = (p) => {
  return (
    <div className="text-field-container">
      <div className="text-field-box">
        <textarea
          autoFocus
          className="text-field"
          wrap="off"
          onChange={(e) => p.setUserText(e.target.value)}
          placeholder="click here to enter text"
        ></textarea>
      </div>
    </div>
  );
};

export default TextField;
