import * as React from "react";
import TextField from "./TextField";
import TextButton from "./TextButton";

const TextInputContainer: React.FunctionComponent<{
  setUserText: (e: string) => void;
  updatePhonemeDisplay: () => void;
}> = (p) => {
  return (
    <div className="text-input-container">
      <TextField setUserText={p.setUserText} />
      <TextButton updatePhonemeDisplay={p.updatePhonemeDisplay} />
    </div>
  );
};

export default TextInputContainer;
