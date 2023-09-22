import * as React from "react";

const SearchDisplay: React.FunctionComponent<{
  updatePhonemeDisplay: () => void;
}> = (p) => {
  return (
    <div className="text-button-container">
      <button className="text-button" onClick={p.updatePhonemeDisplay}>
        Convert to IPA
      </button>
    </div>
  );
};

export default SearchDisplay;
