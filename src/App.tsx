import React, { useState } from "react";
import "./App.css";
import {
  SearchBar,
  DisplayText,
  BaseContent,
  BaseElement,
} from "./components/header";
import TextInputContainer from "./components/TextInputContainer";
import PhonemeDisplayContainer from "./components/PhonemeDisplayContainer";

function App() {
  const [currentSearch, setCurrentSearch] = useState<SearchBar>([]);
  const [displayText, setDisplayText] = useState<DisplayText>([]);
  const [userText, setUserText] = useState("");

  function updatePhonemeDisplay() {
    const test: string = userText;
    const test2: BaseContent = { phoneme: "a", color: undefined };
    const test3: BaseElement = new BaseElement(test2);
    setDisplayText([test3]);
    //console.log(displayText);
  }

  return (
    <div className="App-header">
      <TextInputContainer
        setUserText={setUserText}
        updatePhonemeDisplay={updatePhonemeDisplay}
      />
      <PhonemeDisplayContainer
        displayText={displayText}
        currentSearch={currentSearch}
        updateSearch={setCurrentSearch}
      />
    </div>
  );
}

export default App;
