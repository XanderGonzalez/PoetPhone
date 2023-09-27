import React, { useEffect, useState } from "react";
import "./App.css";
import {
  SearchBar,
  DisplayText,
  BaseContent,
  BaseElement,
} from "./components/header";
import TextInputContainer from "./components/TextInputContainer";
import PhonemeDisplayContainer from "./components/PhonemeDisplayContainer";
import SearchBoxContainer from './components/SearchBoxContainer';

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

  function addToSearch(e: BaseElement) : void {
    const newSearch = currentSearch;
    newSearch.push(e);
    setCurrentSearch(newSearch);
    setDisplayText([]);
    //updatePhonemeDisplay()
    //console.log(currentSearch);
  }

  return (
    <div className="App-header">
      <TextInputContainer
        setUserText={setUserText}
        updatePhonemeDisplay={updatePhonemeDisplay}
      />
      <PhonemeDisplayContainer
        displayText={displayText}
        addToSearch={addToSearch}
      />
      <SearchBoxContainer
        currentSearch={currentSearch}
        setCurrentSearch={e => setCurrentSearch(e)}
      />
    </div>
  );
}

export default App;