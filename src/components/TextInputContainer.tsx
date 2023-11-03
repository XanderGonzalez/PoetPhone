import * as React from "react";
import TextField from "./TextField";
import TextButton from "./TextButton";

const TextInputContainer: React.FunctionComponent<{}> = () => {
  return (
    <div className="text-input-container">
      <TextField />
      <TextButton />
    </div>
  );
};

export default TextInputContainer;
